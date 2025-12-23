import { Router } from '@angular/router';
import { QuestionnaireService } from './../@services/questionnaire.service';
import { Component } from '@angular/core';

// sweetalert
import Swal from 'sweetalert2';
import { FormResponse, FullSurvey, Question, ReviewDraft, ReviewItem, UserAnswer } from '../@interfaces/list-item';
import { CommonModule } from '@angular/common';

// 這是 Review 畫面上要顯示的資料結構
export interface ReviewQuestion extends Question {
  userAnswerText: string;
}

@Component({
  selector: 'app-review',
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {

  // 存放從 Service 載入的草稿數據
  draftData: ReviewDraft | null = null;

  // 存放問卷的完整結構 (用於獲取問題文本)
  surveyData: FullSurvey | null = null;

  // 最終用於模板顯示的列表
  reviewList: ReviewItem[] = [];

  public surveyReviewData: any | undefined;
  public reviewQuestions: ReviewQuestion[] = [];

  // private userResponse: FormResponse | undefined;

  // 導航到 Review 路由
  // 新增一個專門的 Review 頁面路由，並從服務中取出暫存的資料。
  constructor(private questionnaireService: QuestionnaireService, private router: Router) { }

  ngOnInit(): void {
    this.draftData = this.questionnaireService.getDraftData();

    if (!this.draftData) {
      this.router.navigate(['/list']);
      return;
    }

    const quizId = this.draftData.surveyId;

    // 1. 同時獲取問卷資訊與問題列表
    this.questionnaireService.getSurveyById(quizId).subscribe(survey => {
      if (survey) {
        this.surveyData = survey;

        // 2. 必須再抓一次問題列表，否則 survey.questions 可能是空的
        this.questionnaireService.getQuestionsByQuizId(quizId).subscribe(questions => {
          // 將問題裝進 surveyData 供 mapAnswersToQuestions 使用
          this.surveyData!.questions = questions;

          if (this.draftData) {
            this.mapAnswersToQuestions(this.surveyData!, this.draftData.answers);
          }
        });
      } else {
        this.router.navigate(['/list']);
      }
    });
  }

  /**
     * 將用戶的答案 (questionId: answer) 與完整的問題文本 (FullSurvey) 進行匹配
     * @param survey 完整的問卷結構
     * @param answers 用戶填寫的答案 Record<string, any>
     */
  private mapAnswersToQuestions(survey: FullSurvey, answers: Record<string, any>): void {
    const list: ReviewItem[] = [];

    survey.questions.forEach((question: Question) => {
      const qId = question.questionId.toString();
      const rawAnswer = answers[qId];

      let displayAnswer: string;

      if (question.type === 'multiple' && Array.isArray(rawAnswer)) {
        // 複選：['選項A', '選項B'] -> "選項A, 選項B"
        displayAnswer = rawAnswer.length > 0 ? rawAnswer.join(', ') : '未填寫';
      } else if (rawAnswer === '' || rawAnswer === null || rawAnswer === undefined) {
        displayAnswer = '未填寫';
      } else {
        displayAnswer = rawAnswer.toString();
      }

      list.push({
        questionText: question.question, // 對應後端欄位 question
        questionType: question.type,
        userAnswer: displayAnswer
      });
    });

    this.reviewList = list;
  }

  /**
   * 返回填寫頁面，保留草稿數據
   */
  goBackToForm(): void {
    // 導航回原來的問卷填寫頁面
    if (this.draftData) {
      this.router.navigate(['/form', this.draftData.surveyId]);
    } else {
      this.router.navigate(['/list']);
    }
  }

  /**
   * 最終提交表單
   */
  submitForm(): void {
    if (!this.draftData || !this.surveyData) {
      Swal.fire("提交失敗", "error");
      return;
    }

    // 1. 轉換答案格式
    const answersList = this.surveyData.questions.map(question => {
      const qId = question.questionId;
      const userAnswer = this.draftData!.answers[qId.toString()]; // 拿到使用者填寫的內容

      let answerVoList: any[] = [];

      // 根據題目類型尋找匹配的選項物件
      if (question.type === 'single' || question.type === 'multiple') {
        const selectedOptions = Array.isArray(userAnswer) ? userAnswer : [userAnswer];

        answerVoList = question.optionsList
          .filter(opt => selectedOptions.includes(opt.optionName))
          .map(opt => ({
            check: true, // 根據範例，check 似乎是放 questionId
            code: opt.code,
            optionName: opt.optionName
          }));
      } else if (question.type === 'short-answer') {
        // 簡答題通常 code 為 0 或不傳，optionName 放填寫的文字
        answerVoList = [{
          check: true,
          code: 1,
          optionName: userAnswer || ''
        }];
      }

      return {
        questionId: qId,
        answerVoList: answerVoList
      };
    });

    // 2. 組成最終 Payload
    const payload = {
      quizId: this.draftData.surveyId,
      email: "test@gmail.com", //this.draftData.email ||
      answersList: answersList
    };

    console.log('提交填寫數據:', payload);

    // 3. 呼叫 API
    this.questionnaireService.submitSurvey(payload).subscribe({
      next: (res) => {
        if (res.code === 200) {
          Swal.fire({ title: "提交成功！", icon: "success", timer: 1500 });
          this.questionnaireService.clearDraftData();
          this.router.navigate(['/list']);
        } else {
          Swal.fire("提交失敗", res.message, "error");
        }
      },
      error: (err) => Swal.fire("錯誤", "連線失敗", "error")
    });
  }

}
