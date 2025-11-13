import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import Chart from 'chart.js/auto';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-result',
  imports: [MatExpansionModule, MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {

  times = [1, 2, 3, 4, 5, 6, 7, 8];

  readonly panelOpenState = signal(false)

  constructor(private router: Router) { }

  ngOnInit(): void {

    // 獲取 canvas 元素
    let ctx = document.getElementById('chart') as HTMLCanvasElement;

    // 設定數據
    let data = {
      // x 軸文字
      labels: ['非常滿意', '滿意', '不滿意', '非常不滿意'],
      datasets: [
        {
          // 上方分類文字
          label: '資料筆數',
          // 數據
          data: [12000, 3000, 9000, 2000],
          // 線與邊框顏色
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgba(7, 88, 249, 1)',

          ],
          //設定hover時的偏移量，滑鼠移上去表會偏移，方便觀看選種的項目
          hoverOffset: 20,
        },
      ],
    };

    // 創建圖表
    let chart = new Chart(ctx, {
      //pie是圓餅圖,doughnut是環狀圖
      type: 'pie',
      data: data,

    });

    // chart.resize(700, 500);

  }



  checkList() {
    this.router.navigateByUrl('manage');
  }


  logout() {
    this.router.navigateByUrl('login');
  }
}
