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
import { CommonModule } from '@angular/common';
import { ListItem } from '../@interfaces/list-item';
import { HttpClientService } from '../@http-services/http-client.service';

@Component({
  selector: 'app-list',
  imports: [FormsModule, MatDatepickerModule, MatIconModule, MatFormFieldModule, MatInputModule, CommonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  constructor(private questionList: QuestionnaireService, private httpClientService: HttpClientService, private router: Router) { }
  userStartDate!: Date;
  userEndDate!: Date;
  currentPage = 1;         // 當前頁碼 (從 1 開始)
  itemsPerPage = 10;       // 每頁顯示的筆數
  totalItems = 0;          // 總筆數
  totalPages = 0;          // 總頁數


  // 搜尋欄位
  searchData: string = '';

  // 儲存篩選後的資料，初始值為空資料
  // 接著在ngOnInit的地方去篩入資料
  allfilteredData: ListItem[] = [];

  // 儲存當前頁面要顯示的資料 (用於表格顯示)
  pagedData: ListItem[] = [];
  quizzes: ListItem[] = []; // 存放所有列表資料

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    this.questionList.getSurveyListItems().subscribe(data => {
      this.quizzes = data;
      // 在 data 載入後執行 searchForm()，初始化和篩選流程
      this.searchForm();
    });
  }

  // 計算要顯示的dataset
  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    let temp = this.allfilteredData.sort((a, b) => {
      if (a.id > b.id) {
        return -1;
      }
      if (a.id < b.id) {
        return 1;
      }
      return 0;
    })
    // 用 slice 取得當前頁面的數據
    this.pagedData = temp.slice(startIndex, endIndex);
  }

  // 切換頁面
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedData();
    }
  }

  // 處理切換到上一頁
  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  // 處理切換到下一頁
  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  // 獲取頁碼用於在 HTML 中生成頁碼按鈕 (例如: [1, 2, 3, 4])
  getPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  //填寫表單
  filloutForm(id: number) {
    // this.questionList.name = this.userData.name;
    this.router.navigate(['/form', id]);
  }

  // 搜尋與篩選邏輯
  searchForm() {
    if (!this.quizzes || this.quizzes.length == 0) {
      this.allfilteredData = [];
      this.updatePagedData();
      return;
    }


    let tempArray = [...this.quizzes];

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
        const itemStartDate = new Date(data.startDate).getTime();
        const itemEndDate = new Date(data.endDate).getTime();

        let searchStart = null;
        if (this.userStartDate) {
          const d = new Date(this.userStartDate);
          d.setHours(0, 0, 0, 0);
          searchStart = d.getTime();
        }

        let searchEnd = null;
        if (this.userEndDate) {
          const d = new Date(this.userEndDate);
          d.setHours(29, 59, 59, 999);
          searchEnd = d.getTime();
        }


        // 判斷問卷的區間是否與搜尋區間有交集
        const hasStartOverlap = !searchStart || itemEndDate >= searchStart;
        const hasEndOverlap = !searchEnd || itemStartDate <= searchEnd;

        // 如果兩個條件都滿足，則表示有交集，保留此資料
        return hasStartOverlap && hasEndOverlap;
      });
    }

    // 1. 更新所有篩選後的資料
    this.allfilteredData = tempArray;

    // 2. 重設當前頁碼為 1
    this.currentPage = 1;

    // 3. 重新計算總筆數和總頁數
    this.totalItems = this.allfilteredData.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    // 4. 更新當前頁面顯示的數據
    this.updatePagedData();
  }

  profile() {
    this.router.navigateByUrl('profile');

  }

  logout() {
    this.router.navigateByUrl('login');
  }

  history() {
    this.router.navigateByUrl("history");
  }

  revise(surveyId: number): void {
    // 假設您的編輯路由是 /survey/edit
    this.router.navigate(['/survey/edit'], {
      queryParams: {
        id: surveyId
      }
    });
  }
}
