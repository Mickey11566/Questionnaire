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
  inputAge!: number;
  description!: string;
  name!: string;
  fruitOption: string = "apple";
  inputContent!: string;

  // 儲存問卷的基本資訊
  questionnaireInfo: any;

  // 用於收集動態答案的物件
  formAnswers: Record<string, any> = {};

  currentFormData: any | undefined; // 用來儲存當前表單要顯示的資料

  constructor(private route: ActivatedRoute, private router: Router, private questionnaireService: QuestionnaireService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const formId = params.get('id'); // 取得 URL 中的 'id' (字串型態)

      if (formId) {
        const idNumber = +formId; // 將字串轉換為數字

        // 從 Service 獲取問卷的基本資訊
        this.questionnaireInfo = this.questionnaireService.getQuestionnaireById(idNumber);

        // 透過 Service 的方法根據 ID 取得資料
        this.currentFormData = this.questionnaireService.getQuestionnaireById(idNumber);
      }
    });
  }

  // 在透過review.ts 去拆解json
  previewForm() {
    if (!this.questionnaireInfo) {
      console.error('未找到問卷基本資訊');
      return;
    }

    this.formAnswers['input_1'] = this.inputAge;
    this.formAnswers['input_2'] = this.inputName;
    this.formAnswers['input_3'] = this.inputContent;
    this.formAnswers['radio_option'] = this.fruitOption;


    // 組成 ReviewDraft 物件
    const draftData: any = {
      questionnaireId: this.currentFormData.id,
      questionnaireName: this.currentFormData.name,
      questionnaireDescription: this.currentFormData.description,
      questionnaireStartDate: this.currentFormData.startDate, // 傳遞日期
      questionnaireEndDate: this.currentFormData.endDate,     // 傳遞日期

      // 收集使用者填寫的答案
      inputName: this.inputName,
      inputAge: this.inputAge,
      fruitOption: this.fruitOption,
      inputContent: this.inputContent,
    };

    // 存入 Service 並導航
    this.questionnaireService.setDraftData(draftData);

    this.router.navigateByUrl('/review');


  }

}
