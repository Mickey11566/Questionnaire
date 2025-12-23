import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ChartResult, StatisticItem } from '../@interfaces/list-item';

Chart.register(...registerables);

@Component({
  selector: 'app-result',
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTabsModule,

    FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})

export class ResultComponent {
  activeTab = signal<'list' | 'chart'>('list');
  surveyTitle = '公司滿意度調查';
  displayedColumns: string[] = ['id', 'email', 'fillTime', 'action'];

  // 1. 回覆列表資料
  respondents = [
    { email: 'user1@example.com', fillTime: new Date() },
    { email: 'user2@example.com', fillTime: new Date() }
  ];

  // 2. 統計圖表資料
  // 你可以將這段賦值給你的 statisticsData 變數
  statisticsData = [
    {
      questionId: 1,
      questionName: '1. 您對目前工作環境的滿意度為何？',
      type: 'single', // 顯示圓餅圖 (Pie Chart)
      results: [
        { label: '非常滿意', count: 25 },
        { label: '滿意', count: 40 },
        { label: '普通', count: 15 },
        { label: '不滿意', count: 5 },
        { label: '非常不滿意', count: 2 }
      ]
    },
    {
      questionId: 2,
      questionName: '2. 您最常使用辦公室的哪些公共設施？ (多選)',
      type: 'multiple', // 顯示長條圖 (Bar Chart)
      results: [
        { label: '研磨咖啡機', count: 55 },
        { label: '微波爐/電冰箱', count: 32 },
        { label: '舒壓休息區', count: 28 },
        { label: '站立式辦公桌', count: 12 },
        { label: '健身器材', count: 8 }
      ]
    },
    {
      questionId: 3,
      questionName: '3. 對於公司的午餐補助政策，您的看法是？',
      type: 'single',
      results: [
        { label: '非常認同', count: 30 },
        { label: '尚可接受', count: 18 },
        { label: '希望調整', count: 45 }
      ]
    },
    {
      questionId: 4,
      questionName: '4. 除了上述問題，您還有任何建議嗎？',
      type: 'short-answer', // 適合顯示：條列式清單 (Details/Summary)
      results: [
        { content: '希望冷氣可以再調弱一點，靠近窗戶的位置很冷。' },
        { content: '建議增加蔬食餐盒的選項。' },
        { content: '內網系統的操作介面建議更新，目前的有點過時。' },
        { content: '希望每個月能有一次固定的團隊聚餐補助。' },
        { content: '洗手間的清潔頻率可以再增加。' }
      ]
    }
  ];

  readonly panelOpenState = signal(false)

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // 若初始頁籤是圖表才執行，或者監聽 activeTab 變更時重繪
    if (this.activeTab() === 'chart') {
      this.renderCharts();
    }
  }

  // --- 頁面操作方法 ---
  switchTab(tab: 'list' | 'chart'): void {
    this.activeTab.set(tab);
    if (tab === 'chart') {
      this.renderCharts();
    }
  }

  // 儲存圖表實例，避免重複建立導致內存洩漏
  private chartInstances: Chart[] = [];

  private destroyCharts(): void {
    this.chartInstances.forEach((chart) => chart.destroy());
    this.chartInstances = [];
  }

  private renderCharts(): void {
    this.destroyCharts();

    setTimeout(() => {
      this.statisticsData.forEach((stat) => {
        // 3. 關鍵修正：透過 type 判定，並使用強制轉型 (Type Assertion)
        if (stat.type === 'single' || stat.type === 'multiple') {
          const canvasId = `chart-${stat.questionId}`;
          const ctx = document.getElementById(canvasId) as HTMLCanvasElement;

          // 將 results 強制轉為 ChartResult[]，讓 TypeScript 知道這裡一定有 label 和 count
          const chartResults = stat.results as ChartResult[];

          if (ctx) {
            const newChart = new Chart(ctx, {
              type: stat.type === 'single' ? 'pie' : 'bar',
              data: {
                labels: chartResults.map(r => r.label), // 這裡就不會報錯了
                datasets: [{
                  label: '票數',
                  data: chartResults.map(r => r.count), // 這裡也不會報錯了
                  backgroundColor: ['#d5a972', '#a68a64', '#e8d8c3', '#8c765a'],
                  hoverOffset: stat.type === 'single' ? 20 : 0
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false
              }
            });
            this.chartInstances.push(newChart);
          }
        }
      });
    }, 100);
  }

  viewUserDetail(email: string) {
    console.log('查看使用者詳情：', email);
  }


  checkList() {
    this.router.navigateByUrl('manage');
  }


  logout() {
    this.router.navigateByUrl('login');
  }
}
