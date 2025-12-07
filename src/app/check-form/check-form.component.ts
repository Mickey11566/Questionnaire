import { Component } from '@angular/core';

// Material套件
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { FullSurvey } from '../@interfaces/list-item';
import { switchMap } from 'rxjs';
import { QuestionnaireService } from '../@services/questionnaire.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-form',
  imports: [MatIconModule, FormsModule],
  templateUrl: './check-form.component.html',
  styleUrl: './check-form.component.scss'
})
export class CheckFormComponent {

  // 存放從 Service 載入的問卷資料型態
  surveyData: FullSurvey | null = null;

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

  }


  checkList() {
    this.router.navigateByUrl("manage");
  }

  logout() {
    this.router.navigateByUrl('login');
  }
}
