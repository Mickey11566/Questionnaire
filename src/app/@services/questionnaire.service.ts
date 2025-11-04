import { ListItem } from './../@interfaces/list-item';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  // 問卷資訊 如標題、說明等
  name!: string; //問卷名稱
  description!: string; //問卷說明
  id!: number;//問卷編號
  status!: string; //問卷狀態
  startDate!: string; //問卷開始日期
  endDate!: string;//問卷結束日期
  result!: string; //問卷結果

  // 問卷填寫的內容
  inputName!: string;  //填寫的名字
  inputEmail!: string; //填寫的Email
  inputPhone!: string; //填寫的電話
  inputAge!: number; //填寫的年紀
  inputContent!: string; //填寫的原因

  // 用於儲存表單內容
  private currentFormDraft: null = null;

  // 設定表單草稿的方法 (由 QuestionFormComponent 呼叫)
  setDraftData(data: any): void {
    this.currentFormDraft = data;
  }

  // 取得表單草稿 (由 ReviewComponent 呼叫)
  getDraftData(): any | null {
    return this.currentFormDraft;
  }

  // 清除草稿 (在送出或離開時使用)
  clearDraftData(): void {
    this.currentFormDraft = null;
  }

  constructor() { }

  listData: ListItem[] = [
    { id: 3, name: '第八十七屆公司最佳新人獎', description: "現在，解決&#21839;&#21367;的問題，是非常非常重要的。 所以，經過上述討論，那麽，所以說，所謂&#21839;&#21367;，關鍵是&#21839;&#21367;需要如何寫。俾斯麥有說過，對於不屈不撓的人來說，沒有失敗這回事。這啟發了我，更多&#21839;&#21367;的意義是這樣的，&#21839;&#21367;因何而發生？", status: "尚未開始", startDate: "2025-12-21", endDate: "2025-12-31", result: "前往" },
    { id: 5, name: 'Helium', description: "所謂&#21839;&#21367;，關鍵是&#21839;&#21367;需要如何寫。&#21839;&#21367;真的是很值得探究，我們都知道，只要有意義，那麽就必須慎重考慮。一般來說，塞涅卡講過一句話，真正的人生，只有在經過艱難卓絕的鬥爭之後才能實現。這果然是一句至理名言。", status: "進行中", startDate: "2025-10-27", endDate: "2025-11-20", result: "前往" },
    { id: 7, name: 'Lithium', description: "&#21839;&#21367;的發生，到底需要如何做到，不&#21839;&#21367;的發生，又會如何產生。莎士比亞有說過，不良的習慣會隨時阻礙你走向成名、獲利和享樂的路上去。我希望諸位也能好好地體會這句話。", status: "進行中", startDate: "2025-10-01", endDate: "2025-10-01", result: "前往" },
    { id: 9, name: 'Beryllium', description: "你真的了解&#21839;&#21367;嗎？愛因斯坦有一句座右銘，一個人的價值，應該看他貢獻什麼，而不應當看他取得什麼。帶著這句話，我們還要更加慎重的審視這個問題：那麽，這種事實對本人來說意義重大，相信對這個世界也是有一定意義的。", status: "進行中", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 11, name: 'Boron', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 1, name: 'Carbon', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 2, name: 'Nitrogen', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 4, name: 'Oxygen', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 6, name: 'Fluorine', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 8, name: 'Neon', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 10, name: 'Sodium', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 13, name: 'Magnesium', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 12, name: 'Aluminum', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 20, name: 'Silicon', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 19, name: 'Phosphorus', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 17, name: 'Sulfur', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 16, name: 'Chlorine', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 15, name: 'Argon', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 18, name: 'Potassium', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
    { id: 24, name: 'Calcium', description: "", status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  ];

  // 新增一個方法，用來根據 id 取得單一資料
  getQuestionnaireById(id: number): ListItem | undefined {
    return this.listData.find(item => item.id === id);
  }
}
