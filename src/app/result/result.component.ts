import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import Chart from 'chart.js/auto';
import { MatExpansionModule } from '@angular/material/expansion';



@Component({
  selector: 'app-result',
  imports: [MatExpansionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {

  times = [1, 2, 3, 4, 5, 6, 7, 8];

  readonly panelOpenState = signal(false);


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // 獲取 canvas 元素
    let ctx = document.getElementById('chart') as HTMLCanvasElement;

    // 設定數據
    let data = {
      // x 軸文字
      labels: ['餐費', '交通費', '租金'],
      datasets: [
        {
          // 上方分類文字
          label: '支出比',
          // 數據
          data: [12000, 3000, 9000],
          // 線與邊框顏色
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          //設定hover時的偏移量，滑鼠移上去表會偏移，方便觀看選種的項目
          hoverOffset: 40,
        },
      ],
    };

    // 創建圖表
    let chart = new Chart(ctx, {
      //pie是圓餅圖,doughnut是環狀圖
      type: 'pie',
      data: data,
    });

    chart.resize(500, 300);
  }
}
