import { ReviewDraft, FullSurvey } from './../@interfaces/list-item';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionnaireService } from '../@services/questionnaire.service';
import { switchMap } from 'rxjs';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  imports: [FormsModule],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss'
})
export class QuestionFormComponent {

  // 存放從 Service 載入的問卷資料型態
  surveyData: FullSurvey | null = null;

  // 新增答案數據模型，用於雙向綁定
  userAnswers: Record<string, any> = {};

  constructor(private route: ActivatedRoute, private router: Router, private questionnaireService: QuestionnaireService) { }

  ngOnInit(): void {

    // 1. 統一的資料載入邏輯：處理路由 ID 變更並從 Service 獲取數據
    this.route.params.pipe(
      // 當路由參數改變時，切換到新的 Service 請求
      switchMap(params => {
        const surveyId = +params['id']; // 將路由參數（字串）轉換為數字

        // 檢查草稿數據 (如果草稿存在且ID匹配，我們假設草稿處理會覆蓋初始值)
        const draft = this.questionnaireService.getDraftData();
        if (draft && draft.surveyId === surveyId) {
          console.log(`問卷 ID ${surveyId} 載入成功，發現草稿。`);
        } else {
          console.log(`問卷 ID ${surveyId} 載入成功，無草稿。`);
        }

        // 呼叫 Service 的方法，它返回一個 Observable
        return this.questionnaireService.getSurveyById(surveyId);
      })
    ).subscribe({ //使用單一物件訂閱 (Next/Error 處理)
      // 2. 訂閱：接收 Service 返回的【實際 FullSurvey 資料】
      next: (data: FullSurvey | undefined) => {
        if (data) {
          this.surveyData = data; // 成功取得資料，賦值給 Component 屬性

          // 初始化 userAnswers 結構並載入草稿
          this.initializeUserAnswers(data);

        } else {
          // 找不到資料時的錯誤處理
          const currentId = +this.route.snapshot.params['id'];
          console.error(`找不到對應的問卷資料！ID: ${currentId}`);
          alert(`問卷 ID ${currentId} 不存在。將導回列表。`);
          this.router.navigate(['/list']);
        }
      },
      error: (error) => {
        console.error('載入問卷時發生錯誤:', error);
      }
    });
  }

  /**
 * 初始化 userAnswers 物件，並從草稿中載入數據
 */
  private initializeUserAnswers(survey: FullSurvey): void {
    const draft = this.questionnaireService.getDraftData();
    const answers: Record<string, any> = {};

    survey.questions.forEach(question => {
      const questionId = question.id.toString();
      const savedAnswer = draft?.answers ? draft.answers[questionId] : null;

      let initialValue;
      if (savedAnswer !== null) {
        initialValue = savedAnswer;
      } else {
        // 如果是 multiple 類型，初始化為空陣列 []
        initialValue = (question.type === 'multiple' ? [] : '');
      }

      answers[questionId] = initialValue;
    });

    this.userAnswers = answers;
    console.log('答案結構初始化完成:', this.userAnswers);
  }

  /**
 * 處理多選題 (Checkbox) 的勾選/取消勾選事件，並更新 userAnswers 陣列
 * @param questionId 當前問題的 ID
 * @param optionValue 選項的值 (e.g., '選項A')
 * @param event 勾選事件
 */
  onCheckboxChange(questionId: string, optionValue: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const answerArray = this.userAnswers[questionId] as string[];

    if (isChecked) {
      // 勾選時：將選項值加入陣列
      if (!answerArray.includes(optionValue)) {
        answerArray.push(optionValue);
      }
    } else {
      // 取消勾選時：從陣列中移除選項值
      const index = answerArray.indexOf(optionValue);
      if (index > -1) {
        answerArray.splice(index, 1);
      }
    }
  }

  // 修正 previewForm 以使用 userAnswers
  previewForm() {
    if (!this.surveyData) {
      console.error('問卷資料尚未載入');
      return;
    }

    const draftData: ReviewDraft = {
      surveyId: this.surveyData.id,
      surveyName: this.surveyData.name,
      answers: this.userAnswers, // 使用這個答案物件
      lastSaved: new Date(),
    };

    this.questionnaireService.setDraftData(draftData);
    this.router.navigateByUrl('/review');
  }

  backList() {
    this.router.navigateByUrl('/list');
  }
}
