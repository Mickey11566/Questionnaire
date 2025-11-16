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

import { MatButtonModule } from '@angular/material/button'; // <-- 新增
import { MatSelectModule } from '@angular/material/select'; // <-- 新增
import { MatCheckboxModule } from '@angular/material/checkbox'; // <-- 新增
import { MatDividerModule } from '@angular/material/divider'; // <-- 新增
import { Question, Survey } from '../@interfaces/list-item';


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
  currentSurveyData!: Survey;

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
  loadSurveyData(survey: Survey): void {
    this.currentSurveyData = survey;

    // 填充基本資料表單
    this.basicForm.patchValue({
      name: survey.name,
      description: survey.description,
      // 注意：如果您使用 Mat Date Range Picker，日期類型可能需要轉換
      startDate: new Date(survey.startDate),
      endDate: new Date(survey.endDate)
    });

    // 載入題目陣列
    // 必須深層複製題目，避免直接修改 Service 裡面的資料
    this.questions = JSON.parse(JSON.stringify(survey.questions));

    // 設定 nextQuestionId，確保新增題目時 ID 不重複
    this.nextQuestionId = this.questions.length > 0 ?
      Math.max(...this.questions.map(q => q.id)) + 1 : 1;

    console.log(`正在編輯問卷 ID: ${this.surveyIdToEdit}`);
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

  // --- 題目操作方法 (與前次提供的一致) ---

  addQuestion(type: any): void {
    const newQuestion: Question = {
      id: this.nextQuestionId++,
      text: `新問題 ${this.nextQuestionId - 1}`,
      type: type,
      required: false,
      options: type !== 'short-answer' ? ['選項一', '選項二'] : undefined
    };
    this.questions.push(newQuestion);
  }

  deleteQuestion(questionId: number): void {
    this.questions = this.questions.filter(q => q.id !== questionId);
  }

  addOption(question: Question): void {
    if (question.options) {
      question.options.push(`新選項 ${question.options.length + 1}`);
    }
  }

  deleteOption(question: Question, optionIndex: number): void {
    if (question.options) {
      question.options.splice(optionIndex, 1);
    }
  }

  // 提交表單
  submitSurvey(): void {
    // 檢查是否有題目
    if (this.questions.length === 0) {
      Swal.fire({
        title: "請至少新增一個問題！",
        icon: "error",
        timer: 1200,
        showConfirmButton: false
      });
      return;
    }

    // 取得基本資料
    const basicData = this.basicForm.value;

    if (this.isEditMode && this.surveyIdToEdit) {
      // **編輯模式：更新現有問卷**
      const updatedSurvey: Survey = {
        ...this.currentSurveyData, // 保留原有的 ID 和狀態等
        name: basicData.name,
        description: basicData.description,
        startDate: basicData.startDate.toISOString().split('T')[0],
        endDate: basicData.endDate.toISOString().split('T')[0],
        questions: this.questions // 替換為修改後的題目
      };

      this.questionnaireService.updateSurvey(updatedSurvey); // Service 中需要新增此方法
      Swal.fire({
        title: "問卷修改成功！",
        icon: "success",
        timer: 1200,
        showConfirmButton: false
      });
    } else {
      // 組合完整的 Survey 物件
      // 這裡我們模擬 ID 和 Status 的生成
      const newSurvey: Survey = {
        id: Math.floor(Math.random() * 1000) + 16, // 臨時生成一個 ID
        name: basicData.name,
        description: basicData.description,
        startDate: basicData.startDate.toISOString().split('T')[0], // 格式化日期
        endDate: basicData.endDate.toISOString().split('T')[0],   // 格式化日期
        status: '尚未開始', // 預設新建立的問卷狀態
        questions: this.questions
      };

      // 呼叫 Service 進行儲存
      this.questionnaireService.addSurvey(newSurvey);

      Swal.fire({
        title: "問卷新增成功！",
        icon: "success",
        timer: 1200,
        showConfirmButton: false
      });
    }
    setTimeout(() => {
      this.toList();
    }, 1300);
  }
}

