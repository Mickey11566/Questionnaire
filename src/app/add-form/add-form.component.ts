import { QuestionnaireService } from './../@services/questionnaire.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { Question, FullSurvey } from '../@interfaces/list-item';


// sweetalert
import Swal from 'sweetalert2';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-form',
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  templateUrl: './add-form.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './add-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AddFormComponent {

  inputTitle!: string;
  inputDescription!: string;

  currentStep: 'basic' | 'settings' | 'preview' = 'basic'; // 預設為 'basic'

  // 基本資料 (使用響應式表單)
  basicForm!: FormGroup;

  // 題目設定 (使用動態陣列)
  questions: Question[] = [];
  nextQuestionId: number = 1;

  // 模式控制
  isEditMode: boolean = false;
  surveyIdToEdit: number | null = null;

  // 當前編輯的完整問卷資料
  currentSurveyData!: FullSurvey;

  minDate: Date;


  constructor(
    private fb: FormBuilder, // 響應式表單的服務
    private questionnaireService: QuestionnaireService, // 您的問卷服務
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    // 初始化步驟一的表單
    this.basicForm = this.fb.group({
      // Validators.required: 必填驗證
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    // 檢查路由中的查詢參數 (ID)
    this.route.queryParams.pipe(
      // 使用 switchMap 來根據 ID 進行資料載入
      switchMap(params => {
        const id = params['id'];
        if (id) {
          this.isEditMode = true;
          this.surveyIdToEdit = +id; // 將字串轉換為數字
          return this.questionnaireService.getSurveyById(this.surveyIdToEdit); // Service 中需要新增此方法
        } else {
          this.isEditMode = false;
          return of(null); // 沒有 ID 則返回空
        }
      })
    ).subscribe(survey => {
      if (survey) {
        this.loadSurveyData(survey);
      } else {
        // 新增模式：保持表單和題目陣列為空
        this.resetForNewSurvey();
      }
    });
  }

  // 將載入的問卷資料填充到表單和題目陣列中
  loadSurveyData(survey: FullSurvey): void {
    this.currentSurveyData = survey;

    // 填充基本資料表單
    this.basicForm.patchValue({
      name: survey.name,
      description: survey.description,
      startDate: new Date(survey.startDate),
      endDate: new Date(survey.endDate)
    });

    // 載入題目陣列
    // 需複製題目，避免直接修改 Service 裡面的資料
    this.questions = JSON.parse(JSON.stringify(survey.questions));

    // 確保載入的題目 ID 也是正確的
    this.questions = this.questions.map(q => ({
      ...q,
      // 如果後端給的 questionId 剛好是 0，強制轉為 1 (或依需求處理)
      questionId: q.questionId === 0 ? 1 : q.questionId
    }));
  }

  resetForNewSurvey(): void {
    this.basicForm.reset();
    this.questions = [];
    this.nextQuestionId = 1;
  }

  toSettings(): void {
    // 檢查基本資料表單是否有效
    if (this.basicForm.valid) {
      this.currentStep = 'settings';
    } else {
      // 如果無效，標記所有欄位為觸摸 (Touched) 狀態，以便顯示錯誤訊息
      this.basicForm.markAllAsTouched();
      alert('請完成所有必填的基本資料！');
    }
  }

  // 您可能還需要一個返回上一步的功能
  toBasic() {
    this.currentStep = 'basic';
    console.log('返回問卷基本資料');
  }

  toPreview(): void {
    // 這裡可以加入檢查，確保至少有一道題目
    if (this.questions.length === 0) {
      alert('請至少新增一個問卷題目才能預覽！');
      return;
    }
    this.currentStep = 'preview';
    console.log('進入問卷預覽');
  }

  // 從預覽頁返回設定頁 (上一步)
  backToSettings(): void {
    this.currentStep = 'settings';
  }

  toList() {
    this.router.navigateByUrl("manage");
  }

  logout() {
    this.router.navigateByUrl("login");
  }

  // 題目操作方法修改
  addQuestion(type: 'single' | 'multiple' | 'short-answer'): void {

    const maxId = this.questions.length > 0
      ? Math.max(...this.questions.map(q => q.questionId || 0))
      : 0;

    const newQuestion: any = {
      questionId: maxId + 1,
      quizId: this.surveyIdToEdit || 0,
      question: `新問題內容`, // 原為 text
      type: type,
      required: false,
      // 後端 optionsList 即使是空也要是 []
      optionsList: type !== 'short-answer' ? [
        { code: 1, optionName: '選項一' },
        { code: 2, optionName: '選項二' }
      ] : []
    };
    this.questions.push(newQuestion);
  }

  deleteQuestion(questionId: number): void {
    this.questions = this.questions.filter(q => q.questionId !== questionId);
  }

  addOption(question: any): void {
    if (question.optionsList) {
      const newCode = question.optionsList.length > 0
        ? Math.max(...question.optionsList.map((o: any) => o.code)) + 1
        : 1;
      question.optionsList.push({
        code: newCode,
        optionName: `新選項 ${newCode}`
      });
    }
  }

  deleteOption(question: Question, optionIndex: number): void {
    if (question.optionsList) {
      question.optionsList.splice(optionIndex, 1);
    }
  }

  // 確保取得的是當地日期的字串，而不受 UTC 轉換影響
  getLocalDateString(date: Date): string {
    const d = new Date(date);
    // 手動格式化，不使用 toISOString()，避免時區位移
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // 提交表單
  submitSurvey(): void {
    if (this.questions.length === 0) {
      Swal.fire({ title: "請至少新增一個問題！", icon: "error" });
      return;
    }

    const basicData = this.basicForm.value;

    // 1. 建立符合 API 規格的物件
    const payload: any = {
      quizId: this.surveyIdToEdit, // 告訴後端是哪一份問卷
      title: basicData.name,
      description: basicData.description,
      startDate: this.getLocalDateString(basicData.startDate),
      endDate: this.getLocalDateString(basicData.endDate),
      published: false,
      questionVoList: this.questions.map(q => ({
        quizId: this.surveyIdToEdit, // 每個問題要帶上所屬問卷 ID
        questionId: q.questionId || 1, // 如果是原本就有的題目，必須帶上 ID；如果是編輯時新增的題目，給 1
        question: q.question,
        type: q.type,
        required: q.required,
        optionsList: q.optionsList || []
      }))
    };


    // 2. 如果是編輯模式，加上 ID
    if (this.isEditMode && this.surveyIdToEdit) {
      payload.id = this.surveyIdToEdit;
    }

    // 3. 呼叫 Service
    const request$ = this.isEditMode
      ? this.questionnaireService.updateSurvey(payload)
      : this.questionnaireService.createQuiz(payload);

    request$.subscribe({
      next: (res) => {
        if (res.code === 200) {
          Swal.fire({ title: this.isEditMode ? "修改成功！" : "新增成功！", icon: "success", timer: 1200 });
          setTimeout(() => this.toList(), 1300);
        } else {
          Swal.fire("錯誤", res.message, "error");
          console.log(JSON.stringify(payload));
        }
      },
      error: (err) => {
        Swal.fire("錯誤", "與伺服器失敗", "error")
        console.log(err);
      }
    });
  }
}

