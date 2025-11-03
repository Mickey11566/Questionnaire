import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from '../@services/questionnaire.service';

// Material套件
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';



@Component({
  selector: 'app-list',
  imports: [FormsModule, MatDatepickerModule, MatIconModule, MatFormFieldModule, MatInputModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  name!: string;
  no!: number;
  status!: string;
  startDate!: string;
  endDate!: string;
  result!: string;
  userStartDate!: Date;
  userEndDate!: Date;

  userData = [
    { no: 1, name: '第八十七屆公司最佳新人獎', description: "現在，解決&#21839;&#21367;的問題，是非常非常重要的。 所以，經過上述討論，那麽，所以說，所謂&#21839;&#21367;，關鍵是&#21839;&#21367;需要如何寫。俾斯麥有說過，對於不屈不撓的人來說，沒有失敗這回事。這啟發了我，更多&#21839;&#21367;的意義是這樣的，&#21839;&#21367;因何而發生？", status: "尚未開始", startDate: "2025-12-21", endDate: "2025-12-31", result: "前往" },
    { no: 2, name: 'Helium', description: "所謂&#21839;&#21367;，關鍵是&#21839;&#21367;需要如何寫。&#21839;&#21367;真的是很值得探究，我們都知道，只要有意義，那麽就必須慎重考慮。一般來說，塞涅卡講過一句話，真正的人生，只有在經過艱難卓絕的鬥爭之後才能實現。這果然是一句至理名言。", status: "進行中", startDate: "2025-10-27", endDate: "2025-11-20", result: "前往" },
    { no: 3, name: 'Lithium', description: "&#21839;&#21367;的發生，到底需要如何做到，不&#21839;&#21367;的發生，又會如何產生。莎士比亞有說過，不良的習慣會隨時阻礙你走向成名、獲利和享樂的路上去。我希望諸位也能好好地體會這句話。", status: "已結束", startDate: "2025-10-01", endDate: "2025-10-01", result: "前往" },
    { no: 4, name: 'Beryllium', description: "你真的了解&#21839;&#21367;嗎？愛因斯坦有一句座右銘，一個人的價值，應該看他貢獻什麼，而不應當看他取得什麼。帶著這句話，我們還要更加慎重的審視這個問題：那麽，這種事實對本人來說意義重大，相信對這個世界也是有一定意義的。", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { no: 5, name: 'Boron', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { no: 6, name: 'Carbon', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { no: 7, name: 'Nitrogen', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { no: 8, name: 'Oxygen', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { no: 9, name: 'Fluorine', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { no: 10, name: 'Neon', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    // { no: 11, name: 'Sodium', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    // { no: 12, name: 'Magnesium', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    // { no: 13, name: 'Aluminum', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    // { no: 14, name: 'Silicon', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    // { no: 15, name: 'Phosphorus', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    // { no: 16, name: 'Sulfur', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    // { no: 17, name: 'Chlorine', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    // { no: 18, name: 'Argon', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    // { no: 19, name: 'Potassium', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    // { no: 20, name: 'Calcium', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  ];


  constructor(private questionList: QuestionnaireService, private route: ActivatedRoute, private router: Router) { }


  //填寫表單
  filloutForm() {
    // this.questionList.name = this.userData.name;

    this.router.navigateByUrl('/form');
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParamMap.get("id"));

    this.route.params.subscribe(params => {
      console.log(params['id']);
    })

    // 確保在元件初始化時，filteredData 被正確設定
    this.filteredData = [...this.userData];
  }

  // 搜尋欄位
  searchData: string = '';

  arrayData!: any;
  // 儲存篩選後的資料，初始值為原始資料
  filteredData: any[] = this.userData;

  // 搜尋與篩選邏輯
  searchForm() {
    let tempArray = this.userData;

    // 根據「問卷名稱」進行篩選 (如果 searchData 有值)
    if (this.searchData) {
      const searchTerm = this.searchData.toLowerCase().trim();
      tempArray = tempArray.filter(data =>
        data.name.toLowerCase().includes(searchTerm)
      );
    }

    // 根據「日期區間」進行篩選 (如果 userStartDate 或 userEndDate 有值)
    if (this.userStartDate || this.userEndDate) {
      tempArray = tempArray.filter(data => {
        // 將資料中的日期字串轉換為 Date 物件，以便比較
        const itemStartDate = new Date(data.startDate);
        const itemEndDate = new Date(data.endDate);

        // 將使用者選擇的日期進行調整，以便進行區間判斷
        // 開始日期：應當包含當日（所以時間用 00:00:00）
        const searchStart = this.userStartDate ? new Date(this.userStartDate.setHours(0, 0, 0, 0)) : null;
        // 結束日期：應當包含當日（所以時間用 23:59:59）
        const searchEnd = this.userEndDate ? new Date(this.userEndDate.setHours(23, 59, 59, 999)) : null;


        // 判斷問卷的區間是否與搜尋區間有交集
        const hasStartOverlap = !searchStart || itemEndDate >= searchStart;
        const hasEndOverlap = !searchEnd || itemStartDate <= searchEnd;

        // 如果兩個條件都滿足，則表示有交集，保留此資料
        return hasStartOverlap && hasEndOverlap;
      });
    }

    // 更新表格顯示的資料
    this.filteredData = tempArray;
  }
}

export interface questionElement {
  name: string;
  description: string;
  no: number;
  status: string;
  startDate: string;
  endDate: string;
  result: string;
}

