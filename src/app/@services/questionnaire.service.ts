import { ListItem, Survey, Question, FormResponse } from './../@interfaces/list-item';
import { Injectable } from '@angular/core';
import { ReviewDraft } from './../@interfaces/list-item';
import { BehaviorSubject, Observable, of } from 'rxjs';

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


  // 使用 BehaviorSubject 來儲存和廣播問卷資料
  private currentSurveySubject = new BehaviorSubject<Survey | null>(null);
  private currentFormDraft: ReviewDraft | null = null;

  // 用來暫存用戶在填寫頁面的回答
  private currentResponse: FormResponse | undefined;

  // 填寫表單元件將訂閱這個 Observable 來接收資料
  currentSurvey$: Observable<Survey | null> = this.currentSurveySubject.asObservable();

  constructor() { }

  ngOnInit(): void {
    this.updateItemStatuses();
  }

  // 取得今日日期並格式化成當地時區
  getTodayDateOnly(): Date {
    const today = new Date();
    // 建立一個新的 Date 物件，只包含年、月、日，並將時間設定為 UTC 午夜
    // 這樣可以避免時區問題，確保 '2025-11-06' 在任何時區都被視為同一天。
    return new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  }

  // 儲存問卷資料的方法 (從設定元件呼叫)
  setSurveyData(survey: Survey) {
    this.currentSurveySubject.next(survey);
    // 實際應用中，你應該在這裡呼叫 API 將資料儲存到後端
    console.log('問卷資料已儲存到 Service/後端:', survey);
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
      startDate: "2025-11-10",
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

  private fullSurveyData: Survey[] = [
    {
      id: 10,
      name: '主管領導風格評估',
      description: "領導風格影響團隊氛圍與績效。你認為主管在激勵與指導上表現如何？",
      status: "進行中",
      startDate: "2025-11-01",
      endDate: "2025-11-12",
      questions: [
        { id: 1, text: '您認為主管的溝通方式是否清楚明確？', type: 'single', required: true, options: ['非常清楚', '清楚', '普通', '不清楚', '非常不清楚'] },
        { id: 2, text: '主管在激勵團隊方面的表現如何？', type: 'single', required: true, options: ['非常好', '良好', '普通', '稍弱', '很差'] },
        { id: 3, text: '您覺得主管在以下哪些方面表現較佳？ (可複選)', type: 'multiple', required: false, options: ['目標設定', '團隊激勵', '提供資源', '協助決策', '衝突管理'] },
        { id: 4, text: '請分享您認為主管可以改進的地方。', type: 'short-answer', required: false }
      ]
    },

    {
      id: 11,
      name: '顧客服務品質調查',
      description: "顧客滿意是品牌成功的關鍵。你認為我們的服務流程是否友善且高效？",
      status: "尚未開始",
      startDate: "2025-12-10",
      endDate: "2025-12-25",
      questions: [
        { id: 5, text: '您認為客服人員的態度是否友善？', type: 'single', required: true, options: ['非常友善', '友善', '普通', '不太友善', '不友善'] },
        { id: 6, text: '在服務過程中，您是否感到流程順暢？', type: 'single', required: true, options: ['非常順暢', '順暢', '普通', '不順暢'] },
        { id: 7, text: '您希望客服流程未來能加強哪些部分？ (可複選)', type: 'multiple', required: false, options: ['回應速度', '問題解決效率', '服務態度', '知識專業度'] },
        { id: 8, text: '請描述一次讓您印象深刻的客服體驗。', type: 'short-answer', required: false }
      ]
    },

    {
      id: 12,
      name: '產品滿意度調查',
      description: "產品品質與使用體驗密不可分。你的使用感受是否符合預期？",
      status: "已結束",
      startDate: "2025-10-10",
      endDate: "2025-10-20",
      questions: [
        { id: 9, text: '您對產品的整體品質感到滿意嗎？', type: 'single', required: true, options: ['非常滿意', '滿意', '普通', '不滿意', '非常不滿意'] },
        { id: 10, text: '產品是否符合您購買前的預期？', type: 'single', required: true, options: ['完全符合', '大致符合', '普通', '不太符合', '完全不符合'] },
        { id: 11, text: '您認為產品有哪些方面可再加強？ (可複選)', type: 'multiple', required: false, options: ['外觀設計', '使用便利性', '耐用度', '功能完整度', '售後服務'] },
        { id: 12, text: '請描述您使用產品的實際感受。', type: 'short-answer', required: false }
      ]
    },

    {
      id: 13,
      name: '年度活動回饋問卷',
      description: "每一次活動的舉辦，都是團隊努力的成果。你的參與體驗如何？",
      status: "已結束",
      startDate: "2025-09-20",
      endDate: "2025-09-30",
      questions: [
        { id: 13, text: '您對此次活動的整體滿意度如何？', type: 'single', required: true, options: ['非常滿意', '滿意', '普通', '不滿意'] },
        { id: 14, text: '您覺得活動流程安排是否順暢？', type: 'single', required: true, options: ['非常順暢', '順暢', '普通', '不順暢'] },
        { id: 15, text: '本次活動中，您最喜歡哪些部分？ (可複選)', type: 'multiple', required: false, options: ['場地', '講者/節目內容', '互動環節', '活動禮品', '餐飲'] },
        { id: 16, text: '請提供對活動的任何建議或回饋。', type: 'short-answer', required: false }
      ]
    },

    {
      id: 14,
      name: '福利制度滿意度調查',
      description: "福利制度不僅反映企業文化，也影響員工忠誠度。你對現行制度的滿意度如何？",
      status: "進行中",
      startDate: "2025-11-04",
      endDate: "2025-11-18",
      questions: [
        { id: 17, text: '您對目前的休假制度感到滿意嗎？', type: 'single', required: true, options: ['滿意', '尚可', '不滿意'] },
        { id: 18, text: '公司提供的保險福利是否符合您的需求？', type: 'single', required: true, options: ['是', '否', '不確定'] },
        { id: 19, text: '您希望未來加強哪些福利項目？ (可複選)', type: 'multiple', required: false, options: ['彈性工時', '員工旅遊', '進修補助', '健康檢查', '育兒補助'] },
        { id: 20, text: '請為現行福利制度提供具體建議。', type: 'short-answer', required: false }
      ]
    },

    {
      id: 15,
      name: '公司整體滿意度調查',
      description: "公司整體的發展與員工感受息息相關。你的滿意度能幫助我們持續改善。",
      status: "尚未開始",
      startDate: "2025-11-25",
      endDate: "2025-12-05",
      questions: [
        { id: 21, text: '您對公司的整體工作環境滿意嗎？', type: 'single', required: true, options: ['非常滿意', '滿意', '普通', '不滿意'] },
        { id: 22, text: '您認為公司內部的溝通是否順暢？', type: 'single', required: true, options: ['非常順暢', '順暢', '普通', '不順暢'] },
        { id: 23, text: '您覺得公司有哪些方面值得加強？ (可複選)', type: 'multiple', required: false, options: ['人力規劃', '溝通透明度', '員工培訓', '升遷制度', '團隊合作'] },
        { id: 24, text: '請給予公司整體的任何建議或回饋。', type: 'short-answer', required: false }
      ]
    }
  ];

  // 儲存用戶的回答 (在 Form Component 中調用)
  saveCurrentResponse(response: FormResponse): void {
    this.currentResponse = response;
  }

  // 取得用戶的回答 (在 Review Component 中調用)
  getCurrentResponse(): FormResponse | undefined {
    return this.currentResponse;
  }

  // 清除暫存回答 (在提交或返回列表後調用)
  clearCurrentResponse(): void {
    this.currentResponse = undefined;
  }

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
  getFullSurveyById(id: number): Survey | undefined {
    // 從包含完整問題的 private fullSurveyData 陣列中尋找
    return this.fullSurveyData.find(survey => survey.id === id);
  }

  // 模擬列表資料 (包含題目的完整問卷資料)
  private surveys: Survey[] = [
    // 可放 ListItem 轉化為 Survey 的初始資料，假設它從空開始，或只包含 ListItem
  ];


  // 獲取所有問卷的方法
  getSurveys(): Survey[] {
    return this.surveys;
  }

  // 新增問卷的方法
  addSurvey(newSurvey: Survey): void {
    this.surveys.push(newSurvey);

    // 新問卷同時出現在 listData 中，也要加進去
    const newListItem: ListItem = newSurvey;
    this.listData.push(newListItem);

    console.log('新問卷已儲存：', newSurvey);
  }


  // 獲取單個問卷的方法
  getSurveyById(id: number): Observable<Survey | undefined> {
    // 這裡會是 HTTP 請求
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


