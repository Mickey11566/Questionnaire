import { Router } from '@angular/router';
import { QuestionnaireService } from './../@services/questionnaire.service';
import { Component } from '@angular/core';

// sweetalert
import Swal from 'sweetalert2';
import { FormResponse, Question, ReviewDraft, Survey, UserAnswer } from '../@interfaces/list-item';

// 這是 Review 畫面上要顯示的資料結構
export interface ReviewQuestion extends Question {
  userAnswerText: string;
}

@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {

  reviewData: ReviewDraft | null = null;
  questionnaireBasicInfo: any; // 用來儲存 name/description/date 等資訊

  public surveyReviewData: any | undefined;
  public reviewQuestions: ReviewQuestion[] = [];

  private userResponse: FormResponse | undefined;

  // 導航到 Review 路由
  // 新增一個專門的 Review 頁面路由，並從服務中取出暫存的資料。
  constructor(private questionnaireService: QuestionnaireService, private router: Router) { }

  ngOnInit(): void {
    this.userResponse = this.questionnaireService.getCurrentResponse();

    if (!this.userResponse) {
      // 如果沒有暫存的回答，導回填寫頁面或列表
      this.router.navigate(['/list']);
      return;
    }

    // 取得完整的問卷結構
    this.surveyReviewData = this.questionnaireService.getSurveyById(this.userResponse.surveyId);

    if (this.surveyReviewData) {
      // 合併問題和用戶回答
      this.reviewQuestions = this.mapQuestionsWithAnswers(this.surveyReviewData.questions, this.userResponse.answers);
    }
  }

  // 核心邏輯：將問題與回答合併
  private mapQuestionsWithAnswers(questions: Question[], answers: UserAnswer[]): ReviewQuestion[] {
    return questions.map(q => {
      const userAnswer = answers.find(a => a.questionId === q.id);

      let answerText = '未填寫'; // 預設值

      if (userAnswer && userAnswer.answer) {
        if (Array.isArray(userAnswer.answer)) {
          // 複選題：將陣列用逗號連接
          answerText = userAnswer.answer.join(', ');
        } else {
          // 單選或簡答題
          answerText = String(userAnswer.answer);
        }
      }

      return {
        ...q,
        userAnswerText: answerText
      } as ReviewQuestion;
    });
  }

  submitForm() {
    if (this.reviewData) {
      // **console.log 出使用者選擇的答案 JSON 格式**
      // 這裡直接 log 整個 answers 物件
      const finalJsonData = JSON.stringify(this.reviewData.answers, null, 2);

      console.log('--- 使用者填寫的答案 JSON 格式 ---');
      console.log(finalJsonData);
      console.log('------------------------------------');

      this.questionnaireService.clearDraftData();
      Swal.fire({
        title: "提交完成！",
        icon: "success",
        timer: 1200,
        showConfirmButton: false
      });
      setTimeout(() => {
        this.router.navigateByUrl('list')
      }, 1300);
    }
  }

  goBack() {
    // 導航回表單頁面
    if (this.reviewData && this.reviewData.surveyId) {
      this.router.navigate(['/form', this.reviewData.surveyId]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
