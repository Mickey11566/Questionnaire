import { Router } from '@angular/router';
import { QuestionnaireService } from './../@services/questionnaire.service';
import { Component } from '@angular/core';

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

  reviewData: any;

  // 導航到 Review 路由
  // 新增一個專門的 Review 頁面路由，並從服務中取出暫存的資料。
  constructor(private questionnaireService: QuestionnaireService, private router: Router) { }

  ngOnInit(): void {
    this.reviewData = this.questionnaireService.getDraftData();

    this.userName = this.questionnaireService.inputName;
    this.userAge = this.questionnaireService.inputAge;
    this.userContent = this.questionnaireService.inputContent;


    if (!this.reviewData) {
      // 如果沒有資料，可以選擇跳轉回表單頁面
      this.router.navigate(['/form']);


    }
  }

  comfirm() {
    if (this.reviewData) {
      // 建立一個僅包含答案的 JSON 物件
      let answersOnly = {
        inputName: this.reviewData.inputName,
        inputAge: this.reviewData.inputAge,
        fruitOption: this.reviewData.fruitOption,
        inputContent: this.reviewData.inputContent
      };

      // **console.log 出使用者選擇的答案 JSON 格式**
      const finalJsonData = JSON.stringify(answersOnly, null, 2);

      console.log(finalJsonData);

      this.questionnaireService.clearDraftData();
      // 導航到成功頁面
      this.router.navigate(['/list']);
    }

  }

  back() {
    // 返回表單填寫頁面 (需要 ID)
    if (this.reviewData && this.reviewData.questionnaireId) {
      this.router.navigate(['/form', this.reviewData.questionnaireId]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
