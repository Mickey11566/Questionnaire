import { QuestionnaireService } from './../@services/questionnaire.service';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { StatisticItem } from '../@interfaces/list-item';
import { ChangeDetectorRef } from '@angular/core';

// sweetalert
import Swal from 'sweetalert2';

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
  surveyTitle = '';
  // 回覆列表資料
  respondents: any[] = [];
  // 儲存問卷完整資訊，包含題目名稱
  fullQuizQuestions: any[] = [];
  displayedColumns: string[] = ['id', 'email', 'fillTime', 'action'];
  statisticsData: StatisticItem[] = [];
  quizId = signal<number | null>(null);

  isDetailVisible = signal(false);
  selectedEmail = signal('');

  constructor(private router: Router, private route: ActivatedRoute, private questionnaireService: QuestionnaireService, private cdr: ChangeDetectorRef) {
    const navigation = this.router.getCurrentNavigation();
    const stateTitle = navigation?.extras.state?.['title'];

    if (stateTitle) {
      this.surveyTitle = stateTitle;
    }
  }

  closeDetail() {
    this.isDetailVisible.set(false);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        const idNum = Number(idStr);
        this.quizId.set(idNum);

        // 使用修正後的 Service 或分開抓取
        // 取得題目列表
        this.questionnaireService.getQuestionsByQuizId(idNum).subscribe(data => {
          if (data) {
            this.fullQuizQuestions = data; // data 應該為 Question[]

            // 拿到題目名稱之後，再抓統計資料
            this.loadStatistics(idNum);
          }
        });

        // 更新標題 (避免重新整理時標題消失)
        this.fetchSurveyTitle(idNum);

        // 讀取回覆者列表
        this.loadRespondents(idNum);
      }
    });
  }

  loadRespondents(id: number) {
    this.questionnaireService.getQuizRespondents(id).subscribe({
      next: (res) => {
        if (res && res.code === 200 && res.respondentDTOList) {
          this.respondents = res.respondentDTOList.map((item: any) => ({
            email: item.email,
            fillTime: new Date(item.fillinDate)
          }));

          // 觸發更新
          this.cdr.detectChanges();
        }
      }
    });
  }

  fetchSurveyTitle(id: number) {
    this.questionnaireService.getSurveyListItems().subscribe({
      next: (list) => {
        const currentSurvey = list.find(item => item.id === id);
        if (currentSurvey) {
          this.surveyTitle = currentSurvey.name;
        } else {
          this.surveyTitle = '未知問卷';
        }
      },
      error: () => this.surveyTitle = '無法讀取標題'
    });
  }

  loadStatistics(id: number) {
    this.questionnaireService.getStatistics(id).subscribe({
      next: (res) => {
        if (res && res.code === 200) {
          this.processApiData(res.statisticsList);
        }
      },
      error: (err) =>
        Swal.fire({
          title: "API 請求失敗!",
          text: err,
          icon: "error",
          timer: 1500,
          showConfirmButton: false
        }),

    });
  }

  // 封裝資料轉換邏輯
  private processApiData(apiList: any[]) {
    this.statisticsData = apiList.map((item: any) => {
      // 找尋原始題目資訊
      const foundQuestion = this.fullQuizQuestions.find(q => q.questionId === item.questionId);

      // 取得問題的Type資料型態
      const rawType = foundQuestion?.type;

      // 對照型態
      let chartType: 'short-answer' | 'single' | 'multiple';

      // 這裡要跟 HTML @if 條件對上
      if (rawType === 'multiple') {
        chartType = 'multiple';
      } else if (rawType === 'short-answer' || rawType === 'text') {
        chartType = 'short-answer';
      } else {
        chartType = 'single';
      }

      return {
        questionId: item.questionId,
        questionName: foundQuestion?.question || `問題 ${item.questionId}`,
        type: chartType,
        results: item.opCountList.map((op: any) => ({
          label: op.optionName,
          count: op.count,
          content: op.optionName
        }))
      };
    });

    if (this.activeTab() === 'chart') {
      this.renderCharts();
    }
  }

  readonly panelOpenState = signal(false)

  ngAfterViewInit(): void {
    // 若頁面為 chart 才執行渲染圖表
    if (this.activeTab() === 'chart') {
      this.renderCharts();
    }
  }

  switchTab(tab: 'list' | 'chart'): void {
    this.activeTab.set(tab);

    if (tab === 'chart') {
      // 給50毫秒的時間來處理 @if 的 DOM 切換
      setTimeout(() => {
        if (this.statisticsData && this.statisticsData.length > 0) {
          this.renderCharts();
        }
      }, 50);
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
        // 如果是問答題，改由 HTML 顯示列表
        if (stat.type === 'short-answer') return;

        const canvasId = `chart-${stat.questionId}`;
        const canvasElement = document.getElementById(canvasId) as HTMLCanvasElement;

        if (canvasElement) {
          const ctx = canvasElement.getContext('2d');
          if (ctx) {
            // 關鍵：根據 type 決定圖表類型
            const isMultiple = stat.type === 'multiple';

            const newChart = new Chart(ctx, {
              type: isMultiple ? 'bar' : 'pie', // 多選用 bar，單選用 pie
              data: {
                labels: stat.results.map((r: any) => r.label),
                datasets: [{
                  label: '票數',
                  data: stat.results.map((r: any) => r.count),
                  backgroundColor: isMultiple
                    ? ['#d5a972', '#a68a64', '#e8d8c3', '#8c765a']// 長條圖顏色
                    : ['#d5a972', '#a68a64', '#e8d8c3', '#8c765a'], // 圓餅圖顏色
                  hoverOffset: 20

                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: !isMultiple } // 長條圖隱藏圖例
                },
                scales: isMultiple ? { // 長條圖座標軸設定
                  y: { beginAtZero: true, ticks: { stepSize: 1 } }
                } : {}
              }
            });
            this.chartInstances.push(newChart);
          }
        }
      });
    }, 200);
  }

  viewUserDetail(email: string) {
    const quizId = this.quizId(); // 取得目前的問卷 ID

    if (quizId && email) {
      this.router.navigate(['/result', quizId, 'detail', email]);
    }
  }

  checkList() {
    this.router.navigateByUrl('manage');
  }

  logout() {
    this.router.navigateByUrl('login');
  }
}
