import { ListItem, ReviewDraft } from './../@interfaces/list-item';
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

    const draft = this.questionnaireService.getDraftData();

    if (draft && draft.answers) {
      console.log("發現草稿，正在回填數據...");

      // 從 draft.answers 中取回數據並回填到 UI 綁定變數
      this.inputName = draft.answers['inputName'] || '';
      this.inputAge = draft.answers['inputAge'] || '';
      this.fruitOption = draft.answers['fruitOption'] || 'apple';
      this.inputContent = draft.answers['inputContent'] || '';


      // 由於您在 HTML 中需要 name, description, startDate, endDate
      // 如果 Service 中的 draft 裡沒有這些資訊，您需要在 Service 載入它們。
      // 這裡我們假設它們依然可以通過 surveyId 獲取（如果 draft 中沒有 name/description 的話）
      if (draft.surveyId) {
        const idNumber = draft.surveyId;
        this.currentFormData = this.questionnaireService.getQuestionnaireById(idNumber);
      }

    } else {
      console.log("未發現草稿，正在從 Service 載入問卷初始資訊...");

      // 2. 如果沒有草稿，執行正常的初始化流程
      this.route.paramMap.subscribe(params => {
        const formId = params.get('id');
        if (formId) {
          const idNumber = +formId;
          this.currentFormData = this.questionnaireService.getQuestionnaireById(idNumber);
        }
      });
    }

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

    // 1. 收集所有答案到 answers: Record<string, any> 物件中
    const answersData: Record<string, any> = {
      'inputName': this.inputName,
      'inputAge': this.inputAge,
      'fruitOption': this.fruitOption,
      'inputContent': this.inputContent,
      // 如果未來有其他問題，例如 ID 為 'q5' 的問題：
      // 'q5': this.q5Answer,
    };

    // 2. 組成 ReviewDraft 物件
    const draftData: ReviewDraft = {
      surveyId: this.currentFormData.id,
      surveyName: this.currentFormData.name, // 將 name 放入 draft，方便 Review 頁面顯示
      answers: answersData,
      submittedAt: new Date(),
    };

    // 3. 存入 Service
    this.questionnaireService.setDraftData(draftData);

    this.router.navigateByUrl('/review');


  }

}
