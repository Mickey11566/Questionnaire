import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  imports: [DatePipe, MatIconModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  // 假資料測試
  historyList = signal([
    { fillinId: 1, quizId: 9, surveyTitle: '2025 年員工滿意度調查', fillTime: new Date() },
    { fillinId: 2, quizId: 10, surveyTitle: '辦公室零食票選', fillTime: new Date() }
  ]);

  constructor(private router: Router) { }

  goToDetail(item: any) {
    // 導向詳情頁面，並帶入參數
    // 例如：this.router.navigate(['/review-answer', item.fillinId]);
    console.log('查看填寫細節:', item);
  }

  toList() {
    this.router.navigate(['/list']);
  }

  logout() {
    this.router.navigateByUrl('login');
  }


}
