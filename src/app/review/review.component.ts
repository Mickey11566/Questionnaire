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

  private userResponse: FormResponse | undefined;

  // 導航到 Review 路由
  // 新增一個專門的 Review 頁面路由，並從服務中取出暫存的資料。
  constructor(private questionnaireService: QuestionnaireService, private router: Router) { }

  ngOnInit(): void {
    this.draftData = this.questionnaireService.getDraftData();

    if (!this.draftData) {
      // 如果沒有草稿數據，導回列表
      console.warn('未找到草稿數據，導回列表。');
      this.router.navigate(['/list']);
      return;
    }

    // 呼叫 Service 獲取完整的問卷結構，以便將答案與問題文本匹配
    this.questionnaireService.getSurveyById(this.draftData.surveyId).subscribe({
      next: (data: FullSurvey | undefined) => {
        if (data) {
          this.surveyData = data;
          this.mapAnswersToQuestions(data, this.draftData!.answers);
        } else {
          console.error('無法載入問卷結構！');
          this.router.navigate(['/list']);
        }
      },
      error: (err) => {
        console.error('載入問卷結構失敗:', err);
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
      const questionId = question.id.toString();
      const rawAnswer = answers[questionId];

      let displayAnswer: any;

      // 格式化答案以供顯示 (例如，將陣列轉換為逗號分隔的字串)
      if (question.type === 'multiple' && Array.isArray(rawAnswer)) {
        displayAnswer = rawAnswer.join(', ');
      } else {
        displayAnswer = rawAnswer || '未填寫';
      }

      list.push({
        questionText: question.text,
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
      alert('資料不完整，無法提交。');
      return;
    }

    // 1. 將 answers: Record<string, any> 轉換為 FormResponse 要求的結構
    const userAnswers: FormResponse['answers'] = [];
    for (const id in this.draftData.answers) {
      if (this.draftData.answers.hasOwnProperty(id)) {
        userAnswers.push({
          questionId: parseInt(id, 10), // 轉換為數字
          answer: this.draftData.answers[id]
        });
      }
    }

    const response: FormResponse = {
      surveyId: this.draftData.surveyId,
      answers: userAnswers,
      submittedAt: new Date()
      // 可以在這裡添加其他提交資訊
    };

    console.log('問卷提交數據:', response);

    // 3. 提交成功後的關鍵步驟：清除草稿並導航
    this.questionnaireService.clearDraftData();

    // 顯示成功訊息 (可選)
    Swal.fire({ title: "問卷提交成功！", icon: "success", timer: 1500, showConfirmButton: false });
    setTimeout(() => {

      // 導航到成功頁面或列表頁
      this.router.navigate(['/list']);
    }, 1500);
  }

}
