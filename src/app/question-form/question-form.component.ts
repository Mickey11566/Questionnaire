import { ListItem } from './../@interfaces/list-item';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { QuestionnaireService } from '../@services/questionnaire.service';
import { FormsModule } from '@angular/forms';
import { ReviewComponent } from '../review/review.component';


@Component({
  selector: 'app-question-form',
  imports: [RouterLink, FormsModule, ReviewComponent],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss'
})
export class QuestionFormComponent {

  inputName!: string;
  inputEmail!: string;
  inputPhone!: string;
  inputAge!: number;
  description!: string;
  name!: string;
  inputContent!: string;

  currentFormData: ListItem | undefined; // 用來儲存當前表單要顯示的資料

  constructor(private route: ActivatedRoute, private router: Router, private questionnaireService: QuestionnaireService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const formId = params.get('id'); // 取得 URL 中的 'id' (字串型態)

      if (formId) {
        const idNumber = +formId; // 將字串轉換為數字

        // 透過 Service 的方法根據 ID 取得資料
        this.currentFormData = this.questionnaireService.getQuestionnaireById(idNumber);

        if (this.currentFormData) {
          console.log(`已載入 ID ${idNumber} 的表單：`, this.currentFormData.name);
          // 此時 currentFormData 已經包含 name 和 description
        } else {
          console.error(`找不到 ID 為 ${idNumber} 的表單資料。`);
          // 可以導航回列表頁或顯示錯誤訊息
        }
      } else {
        console.error('路由中缺少表單 ID 參數。');
      }
    });
  }


  // 將資料包成json格式 傳送至review
  // 在透過review.ts 去拆解json
  previewForm() {
    // this.questionnaireService.setDraftData(formM)
    this.questionnaireService.inputAge = this.inputAge;
    this.questionnaireService.inputPhone = this.inputPhone;
    this.questionnaireService.inputEmail = this.inputEmail;
    this.questionnaireService.inputName = this.inputName;
    this.questionnaireService.inputContent = this.inputContent;

    this.router.navigateByUrl('/review');
  }

}
