import { ReviewDraft, FullSurvey, Question } from './../@interfaces/list-item';
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

  questions: Question[] = [];

  // 存放從 Service 載入的問卷資料型態
  surveyData: FullSurvey | null = null;

  // 新增答案數據模型，用於雙向綁定
  userAnswers: Record<string, any> = {};

  constructor(private route: ActivatedRoute, private router: Router, private questionList: QuestionnaireService) { }

  ngOnInit(): void {
    const quizId = Number(this.route.snapshot.paramMap.get('id'));

    if (quizId) {
      // 步驟 1: 取得問卷基本資訊 (標題、描述、日期)
      this.questionList.getSurveyDetail(quizId).subscribe(survey => {
        if (survey) {
          this.surveyData = survey; // 賦值給 surveyData，解鎖 HTML 顯示

          // 步驟 2: 取得該問卷的問題列表
          this.questionList.getQuestionsByQuizId(quizId).subscribe(data => {
            this.questions = data;

            // 步驟 3: 將問題列表封裝進一個臨時物件，傳給初始化方法
            // 因為你的 initializeUserAnswers 需要 FullSurvey 結構
            const surveyForInit: FullSurvey = {
              ...survey,
              questions: data
            };

            this.initializeUserAnswers(surveyForInit);
          });
        }
      });
    }
  }

  /**
 * 初始化 userAnswers 物件，並從草稿中載入數據
 */
  private initializeUserAnswers(survey: FullSurvey): void {
    const draft = this.questionList.getDraftData();
    const answers: Record<string, any> = {};

    // 確保 survey.questions 存在才進行迴圈
    if (survey.questions) {
      survey.questions.forEach(question => {
        // 注意：後端 API 回傳的是 questionId
        const qId = question.questionId.toString();
        const savedAnswer = draft?.answers ? draft.answers[qId] : null;

        let initialValue;
        if (savedAnswer !== null) {
          initialValue = savedAnswer;
        } else {
          initialValue = (question.type === 'multiple' ? [] : '');
        }

        answers[qId] = initialValue;
      });
    }

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

    this.questionList.setDraftData(draftData);
    this.router.navigateByUrl('/review');

  }

  backList() {
    this.router.navigateByUrl('/list');
  }
}
