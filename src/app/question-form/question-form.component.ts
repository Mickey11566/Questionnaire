import { CurrentFormData, ListItem, ReviewDraft, Survey } from './../@interfaces/list-item';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { QuestionnaireService } from '../@services/questionnaire.service';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ReviewComponent } from '../review/review.component';


@Component({
  selector: 'app-question-form',
  imports: [RouterLink, FormsModule, ReviewComponent],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss'
})
export class QuestionFormComponent {

  // 存放從 Service 載入的問卷資料型態
  surveyData: Survey | null = null;

  // 用於收集使用者答案的頂層 FormGroup
  surveyForm!: FormGroup;

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

  private fullSurveyData: Survey[] = [/* ... 您的 fullSurveyData 陣列內容 ... */];

  currentFormData: any | undefined; // 用來儲存當前表單要顯示的資料

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private questionnaireService: QuestionnaireService) { }

  ngOnInit(): void {

    const draft = this.questionnaireService.getDraftData();

    // 1. 取得路由中的 ID
    this.route.params.subscribe(params => {
      const surveyId = +params['id']; // 將路由參數（字串）轉換為數字

      // 2. 呼叫合併資料的方法
      this.currentFormData = this.getCombinedSurveyData(surveyId);

      if (!this.currentFormData) {
        console.error('找不到對應的問卷資料！ID:', surveyId);
        // 處理找不到資料的情況，例如導回列表頁
      }
    });


    if (draft && draft.answers) {
      console.log("發現草稿，正在回填數據...");

      // 從 draft.answers 中取回數據並回填到 UI 綁定變數
      this.inputName = draft.answers['inputName'] || '';
      this.inputAge = draft.answers['inputAge'] || '';
      this.fruitOption = draft.answers['fruitOption'] || 'apple';
      this.inputContent = draft.answers['inputContent'] || '';

      if (draft.surveyId) {
        const idNumber = draft.surveyId;
        this.currentFormData = this.questionnaireService.getFullSurveyById(idNumber);
      }

    } else {
      console.log("未發現草稿，正在從 Service 載入問卷初始資訊...");

      // 2. 如果沒有草稿，執行正常的初始化流程
      this.route.paramMap.subscribe(params => {
        const formId = params.get('id');
        if (formId) {
          const idNumber = +formId;
          this.currentFormData = this.questionnaireService.getFullSurveyById(idNumber);
        }
      });

    }

    this.route.paramMap.subscribe(params => {
      const formId = params.get('id'); // 取得 URL 中的 'id' (字串型態)

      if (formId) {
        const idNumber = +formId; // 將字串轉換為數字

        // 從 Service 獲取問卷的基本資訊
        this.questionnaireInfo = this.questionnaireService.getFullSurveyById(idNumber);

        // 透過 Service 的方法根據 ID 取得資料
        this.currentFormData = this.questionnaireService.getFullSurveyById(idNumber);
      }
    });
  }

  getCombinedSurveyData(id: number): CurrentFormData | undefined {
    // 從 fullSurveyData 找到包含 questions 的完整資料
    const fullData = this.fullSurveyData.find(survey => survey.id === id);

    if (fullData) {
      // 提取 questions 以外的 ListItem 屬性
      const { questions, ...listItem } = fullData;

      // 合併並返回結果
      return {
        ...listItem, // 包含 id, name, description, status, startDate, endDate
        questions: questions // 包含問題陣列
      };
    }

    return undefined; // 找不到對應 ID 的資料
  }

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
