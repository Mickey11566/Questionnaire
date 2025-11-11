import { Router } from '@angular/router';
import { QuestionnaireService } from './../@services/questionnaire.service';
import { Component } from '@angular/core';


// sweetalert
import Swal from 'sweetalert2';
import { ReviewDraft } from '../@interfaces/list-item';


@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  userName!: string;
  userEmail!: string;
  userPhone!: string;
  userAge!: number;
  userContent!: string;

  reviewData: ReviewDraft | null = null;
  questionnaireBasicInfo: any; // 用來儲存 name/description/date 等資訊

  // 導航到 Review 路由
  // 新增一個專門的 Review 頁面路由，並從服務中取出暫存的資料。
  constructor(private questionnaireService: QuestionnaireService, private router: Router) { }

  ngOnInit(): void {
    this.reviewData = this.questionnaireService.getDraftData();

    if (this.reviewData && this.reviewData.surveyId) {
      // 為了在預覽頁面顯示 name, description, startDate, endDate，我們需要再次從 Service 獲取
      this.questionnaireBasicInfo = this.questionnaireService.getQuestionnaireById(this.reviewData.surveyId);
    } else {
      console.warn('沒有預覽資料，返回。');
    }
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
