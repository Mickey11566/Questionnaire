import { ListItem, Survey, Question } from './../@interfaces/list-item';
import { Injectable } from '@angular/core';
import { ReviewDraft } from './../@interfaces/list-item';
import { Observable, of } from 'rxjs';

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

  // 問卷填寫的內容
  inputName!: string;  //填寫的名字
  inputEmail!: string; //填寫的Email
  inputPhone!: string; //填寫的電話
  inputAge!: number; //填寫的年紀
  inputContent!: string; //填寫的原因

  private currentFormDraft: ReviewDraft | null = null;

  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.updateItemStatuses();
  }

  getTodayDateOnly(): Date {
    const today = new Date();
    // 建立一個新的 Date 物件，只包含年、月、日，並將時間設定為 UTC 午夜
    // 這樣可以避免時區問題，確保 '2025-11-06' 在任何時區都被視為同一天。
    return new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  }

  /**
   * 根據今天的日期，更新 listData 中所有項目的狀態。
   */
  updateItemStatuses(): void {
    const today = this.getTodayDateOnly();

    this.listData.forEach(item => {
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);

      // --- 判斷邏輯 ---

      // 1. 已結束 (今天 > 結束日期)
      if (today.getTime() > endDate.getTime()) {
        item.status = "已結束";
      }
      // 2. 進行中 (今天 >= 開始日期 且 今天 <= 結束日期)
      else if (today.getTime() >= startDate.getTime() && today.getTime() <= endDate.getTime()) {
        item.status = "進行中";
      }
      // 3. 尚未開始 (今天 < 開始日期)
      else if (today.getTime() < startDate.getTime()) {
        item.status = "尚未開始";
      }
    });

    console.log('更新後的 listData:', this.listData);
  }

  listData: ListItem[] = [
    {
      id: 1,
      name: '工作滿意度調查',
      description: "工作的意義在於實現自我價值。如何在壓力與成就之間取得平衡，是每個人都需要思考的問題。",
      status: "進行中",
      startDate: "2025-11-01",
      endDate: "2025-11-15",
    },
    {
      id: 2,
      name: '公司環境與文化問卷',
      description: "良好的工作環境能激發員工的潛力。那麼，公司文化與氛圍的營造，究竟該如何影響員工滿意度呢？",
      status: "尚未開始",
      startDate: "2025-11-20",
      endDate: "2025-12-05",
    },
    {
      id: 3,
      name: '員工健康與壓力調查',
      description: "健康是一切的基礎。當壓力成為日常的一部分，我們該如何維持心理與身體的平衡？",
      status: "進行中",
      startDate: "2025-11-03",
      endDate: "2025-11-20",
    },
    {
      id: 4,
      name: '遠端工作經驗問卷',
      description: "隨著科技發展，遠端工作已成常態。你對遠端工作的效率與挑戰有何看法？",
      status: "尚未開始",
      startDate: "2025-12-01",
      endDate: "2025-12-15",
    },
    {
      id: 5,
      name: '年度培訓成效評估',
      description: "學習與成長是企業發展的核心。培訓是否真的讓你有所收穫？",
      status: "已結束",
      startDate: "2025-10-01",
      endDate: "2025-10-10",
    },
    {
      id: 6,
      name: '部門合作滿意度調查',
      description: "團隊合作是成功的基礎。你認為跨部門溝通是否順暢？",
      status: "進行中",
      startDate: "2025-11-05",
      endDate: "2025-11-18",
    },
    {
      id: 7,
      name: '工作與生活平衡問卷',
      description: "當生活節奏越來越快，如何在工作與家庭之間取得平衡，成為許多人心中的課題。",
      status: "尚未開始",
      startDate: "2025-11-25",
      endDate: "2025-12-05",
    },
    {
      id: 8,
      name: '內部溝通效率調查',
      description: "有效的溝通能提升團隊的凝聚力。你認為目前的資訊流通是否足夠透明？",
      status: "進行中",
      startDate: "2025-11-02",
      endDate: "2025-11-17",
    },
    {
      id: 9,
      name: '新進員工適應情況問卷',
      description: "對新員工而言，入職初期的體驗非常關鍵。你是否覺得公司的培訓與輔導足夠完善？",
      status: "已結束",
      startDate: "2025-09-15",
      endDate: "2025-09-30",
    },
    {
      id: 10,
      name: '主管領導風格評估',
      description: "領導風格影響團隊氛圍與績效。你認為主管在激勵與指導上表現如何？",
      status: "進行中",
      startDate: "2025-11-01",
      endDate: "2025-11-12",
    },
    {
      id: 11,
      name: '顧客服務品質調查',
      description: "顧客滿意是品牌成功的關鍵。你認為我們的服務流程是否友善且高效？",
      status: "尚未開始",
      startDate: "2025-12-10",
      endDate: "2025-12-25",
    },
    {
      id: 12,
      name: '產品滿意度調查',
      description: "產品品質與使用體驗密不可分。你的使用感受是否符合預期？",
      status: "已結束",
      startDate: "2025-10-10",
      endDate: "2025-10-20",
    },
    {
      id: 13,
      name: '年度活動回饋問卷',
      description: "每一次活動的舉辦，都是團隊努力的成果。你的參與體驗如何？",
      status: "已結束",
      startDate: "2025-09-20",
      endDate: "2025-09-30",
    },
    {
      id: 14,
      name: '福利制度滿意度調查',
      description: "福利制度不僅反映企業文化，也影響員工忠誠度。你對現行制度的滿意度如何？",
      status: "進行中",
      startDate: "2025-11-04",
      endDate: "2025-11-18",
    },
    {
      id: 15,
      name: '公司整體滿意度調查',
      description: "公司整體的發展與員工感受息息相關。你的滿意度能幫助我們持續改善。",
      status: "尚未開始",
      startDate: "2025-11-25",
      endDate: "2025-12-05",
    }
  ];


  // 設定預覽草稿
  setDraftData(data: ReviewDraft): void {
    this.currentFormDraft = data;
  }

  // 取得預覽草稿
  getDraftData(): ReviewDraft | null {
    return this.currentFormDraft;
  }

  // 清空預覽草稿
  clearDraftData(): void {
    this.currentFormDraft = null;
  }

  // 新增一個方法，用來根據 id 取得單一資料
  getQuestionnaireById(id: number): ListItem | undefined {
    return this.listData.find(item => item.id === id);
  }

  // 模擬列表資料 (包含題目的完整問卷資料)
  private surveys: Survey[] = [
    // 這裡可以放您的 ListItem 轉化為 Survey 的初始資料
    // 但為簡化，我們先假設它從空開始，或只包含 ListItem
  ];


  // 獲取所有問卷的方法
  getSurveys(): Survey[] {
    return this.surveys;
  }

  // 新增問卷的方法
  addSurvey(newSurvey: Survey): void {
    this.surveys.push(newSurvey);

    // 如果您想讓新問卷同時出現在 listData 中，也要加進去
    const newListItem: ListItem = newSurvey;
    this.listData.push(newListItem);

    console.log('新問卷已儲存：', newSurvey);
  }


  // 獲取單個問卷的方法
  getSurveyById(id: number): Observable<Survey | undefined> {
    // 在實際應用中，這裡會是 HTTP 請求
    const survey = this.surveys.find(s => s.id === id);
    return of(survey); // 返回 Observable<Survey | undefined>
  }

  // 更新問卷的方法
  updateSurvey(updatedSurvey: Survey): void {
    const index = this.surveys.findIndex(s => s.id === updatedSurvey.id);
    if (index > -1) {
      // 更新完整問卷陣列
      this.surveys[index] = updatedSurvey;

      // 同步更新列表顯示資料 (listData)
      const listIndex = this.listData.findIndex(item => item.id === updatedSurvey.id);
      if (listIndex > -1) {
        this.listData[listIndex] = updatedSurvey; // ListItem 屬性也被更新
      }

      console.log(`問卷 ID ${updatedSurvey.id} 已更新`);
    } else {
      console.error(`找不到問卷 ID ${updatedSurvey.id} 無法更新`);
    }
  }

  // 輔助方法：根據日期計算問卷的狀態
  private calculateStatus(startDateStr: string, endDateStr: string): string {
    // 獲取今天的日期，並將時間部分設為午夜 (00:00:00) 以便於比較
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 將問卷的日期字串轉換為 Date 物件
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // 確保結束日期也設為午夜，便於比較
    endDate.setHours(0, 0, 0, 0);

    // 為了讓結束日當天仍然是「進行中」，我們將結束日期加一天後再比較
    const dayAfterEndDate = new Date(endDate);
    dayAfterEndDate.setDate(dayAfterEndDate.getDate() + 1);

    if (today.getTime() < startDate.getTime()) {
      return "尚未開始";
    } else if (today.getTime() >= startDate.getTime() && today.getTime() < dayAfterEndDate.getTime()) {
      // 今天的日期在開始日期（含）和結束日期的次日（不含）之間
      return "進行中";
    } else {
      // 今天的日期 >= 結束日期的次日
      return "已結束";
    }
  }

  /**
     * 獲取所有問卷列表數據，並計算最新的狀態
     */
  getSurveyListItems(): Observable<ListItem[]> {
    // 在返回 listData 之前，動態更新每項的狀態
    const updatedList = this.listData.map(item => {
      const newStatus = this.calculateStatus(item.startDate, item.endDate);
      return {
        ...item,
        status: newStatus // 用計算出的新狀態覆蓋舊狀態
      };
    });
    return of(updatedList);
  }
}


