import { Component } from '@angular/core';

// Material套件
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { FullSurvey, Question } from '../@interfaces/list-item';
import { forkJoin, switchMap } from 'rxjs';
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
  questions: Question[] = [];
  userAnswers: Record<string, any> = {}; // 雖然不存答案，但為了模板不報錯仍需定義

  constructor(private route: ActivatedRoute, private router: Router, private questionnaireService: QuestionnaireService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const surveyId = +params['id'];

        // 同時抓取：問卷基本資訊 & 問題列表
        return forkJoin({
          survey: this.questionnaireService.getSurveyById(surveyId),
          questions: this.questionnaireService.getQuestionsByQuizId(surveyId)
        });
      })
    ).subscribe({
      next: (res) => {
        if (res.survey) {
          // 將問題注入 survey 物件中，並保存到 component 變數
          this.surveyData = { ...res.survey, questions: res.questions };
          this.questions = res.questions;

          // 初始化空結構，確保 HTML 渲染時 ngModel 有對象可以綁定
          this.initializeEmptyAnswers(res.questions);
        } else {
          this.router.navigate(['/list']);
        }
      },
      error: (err) => {
        console.error('載入失敗', err);
        this.router.navigate(['/list']);
      }
    });
  }

  private initializeEmptyAnswers(questions: Question[]): void {
    const answers: Record<string, any> = {};
    questions.forEach(q => {
      const qId = q.questionId.toString();
      // 管理者查看模式，全部預設為空，且不處理草稿
      answers[qId] = (q.type === 'multiple' ? [] : '');
    });
    this.userAnswers = answers;
  }

  backToList() {
    this.router.navigateByUrl("manage");

  }

  checkList() {
    this.router.navigateByUrl("manage");
  }

  logout() {
    this.router.navigateByUrl('login');
  }
}
