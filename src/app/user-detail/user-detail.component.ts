import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from '../@services/questionnaire.service';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  // 使用 Signal 儲存資訊
  quizId = signal<number | null>(null);
  email = signal<string>('');

  // 假資料清單
  userAnswers = signal<any[]>([
    {
      questionId: 1,
      questionTitle: '您對本次課程內容的安排是否滿意？',
      type: 'single',
      answer: '非常滿意'
    },
    {
      questionId: 2,
      questionTitle: '您最感興趣的單元有哪些？(可複選)',
      type: 'multiple',
      answer: '前端架構設計, RxJS 實戰應用, TypeScript 進階技巧'
    },
    {
      questionId: 3,
      questionTitle: '請留下您對講師的建議或回饋',
      type: 'short-answer',
      answer: '老師講解非常清晰，範例程式碼也很有幫助，希望下次可以多增加一些工作坊的環節。'
    },
    {
      questionId: 4,
      questionTitle: '您未來是否願意參加類似的進階課程？',
      type: 'single',
      answer: '願意'
    }
  ]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionnaireService: QuestionnaireService
  ) {

  }

  ngOnInit(): void {
    // 雖然不呼叫 API，但我們仍從 URL 抓取 Email 顯示在標題
    const idParam = this.route.snapshot.paramMap.get('id');
    const emailParam = this.route.snapshot.paramMap.get('email');

    if (idParam && emailParam) {
      this.quizId.set(Number(idParam));
      this.email.set(emailParam);
    }
  }
  getTypeLabel(type: string): string {
    const typeMap: any = {
      'single': '單選題',
      'multiple': '多選題',
      'short-answer': '問答題'
    };
    return typeMap[type] || '一般題型';
  }

  goBack(): void {
    // 返回統計頁面
    this.router.navigate(['/result', this.quizId()]);
  }
}
