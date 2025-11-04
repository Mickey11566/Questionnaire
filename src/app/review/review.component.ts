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

  reviewData: | null = null;


  // 對於表單預覽，我們通常不將整個表單數據放在 URL 裡 (因為資料可能過大或包含敏感資訊)。
  // 使用 Service 暫存資料 (State Management)
  // 在 QuestionnaireService 或一個專門的 ReviewService 中新增屬性來暫存使用者在表單中填寫的即時資料。

  // 導航到 Review 路由
  // 新增一個專門的 Review 頁面路由，並從服務中取出暫存的資料。
  constructor(private questionnaireService: QuestionnaireService, private router: Router) { }

  ngOnInit(): void {

    this.userName = this.questionnaireService.inputName;
    this.userEmail = this.questionnaireService.inputEmail;
    this.userPhone = this.questionnaireService.inputPhone;
    this.userAge = this.questionnaireService.inputAge;
    this.userContent = this.questionnaireService.inputContent;
  }

  comfirm() {
    console.log("123");

    this.router.navigate(['list']);
  }

  back() {
    // 返回到之前的表單填寫頁面
    // 我們需要知道原本的 ID 才能正確返回
    // if (this.reviewData && this.reviewData.questionnaireId) {
    //   this.router.navigate(['/form', this.reviewData.questionnaireId]);
    // } else {
    //   this.router.navigate(['/']); // 如果沒有 ID，導航到首頁
    // }
  }
}
