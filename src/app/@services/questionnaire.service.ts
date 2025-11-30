import { ListItem, FullSurvey, FormResponse, ReviewDraft } from './../@interfaces/list-item';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  // ----------------------------------------------------------------
  // 內部狀態管理屬性 (僅 Service 內部使用)
  // ----------------------------------------------------------------

  // 1. 儲存所有完整問卷資料的單一數據源 (管理員介面的核心)
  private fullSurveyData: FullSurvey[] = this.getMockSurveyData();

  // 2. BehaviorSubject 用於廣播【當前正在填寫的問卷】(填寫介面的核心)
  private currentSurveySubject = new BehaviorSubject<FullSurvey | null>(null);

  // 3. 用來暫存用戶在填寫頁面的回答 (用於 Review/Draft 功能)
  private currentResponse: FormResponse | undefined;
  private currentFormDraft: ReviewDraft | null = null;


  // ----------------------------------------------------------------
  // 可供 Component 訂閱的 Observable
  // ----------------------------------------------------------------

  /**
   * 填寫表單元件訂閱此 Observable 來接收當前問卷資料。
   * 用於：【填寫問卷】
   */
  currentSurvey$: Observable<FullSurvey | null> = this.currentSurveySubject.asObservable();


  // ----------------------------------------------------------------
  // 構造函數 (用於初始化)
  // ----------------------------------------------------------------

  constructor() {
    // 服務初始化邏輯放在這裡。不需要 ngOnInit()。
    console.log('QuestionnaireService 初始化完成，載入模擬資料。');
  }


  // ----------------------------------------------------------------
  // 輔助方法：計算問卷狀態 (邏輯優化保持不變)
  // ----------------------------------------------------------------

  /**
   * 輔助方法：根據今天的日期計算問卷的狀態
   */
  private calculateStatus(startDateStr: string, endDateStr: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 確保時間部分設為午夜

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    endDate.setHours(0, 0, 0, 0);

    // 為了讓結束日當天仍是「進行中」，將結束日期加一天後再比較
    const dayAfterEndDate = new Date(endDate);
    dayAfterEndDate.setDate(dayAfterEndDate.getDate() + 1);

    if (today.getTime() < startDate.getTime()) {
      return "尚未開始";
    } else if (today.getTime() >= startDate.getTime() && today.getTime() < dayAfterEndDate.getTime()) {
      return "進行中";
    } else {
      return "已結束";
    }
  }


  // ----------------------------------------------------------------
  // 問卷列表與讀取 (使用者與管理者共用)
  // ----------------------------------------------------------------

  /**
   * 獲取所有問卷列表數據，並動態計算最新的狀態。
   * 用於：【顯示問卷列表】
   */
  getSurveyListItems(): Observable<ListItem[]> {
    // 從 FullSurvey 陣列中提取 ListItem 資訊並計算狀態
    const updatedList: ListItem[] = this.fullSurveyData.map(item => {
      const newStatus = this.calculateStatus(item.startDate, item.endDate);

      // 使用擴展運算符並強制類型轉換，只返回 ListItem 的屬性
      return {
        ...item,
        status: newStatus
      } as ListItem;
    });

    return of(updatedList); // 使用 of() 模擬 HTTP 請求的回傳
  }

  /**
   * 根據 ID 獲取單個問卷的完整資料。
   * 用於：【填寫問卷】、【修改問卷】
   * @param id 問卷編號
   */
  getSurveyById(id: number): Observable<FullSurvey | undefined> {
    const survey = this.fullSurveyData.find(s => s.id === id);

    // 如果找到問卷，將其廣播給 currentSurvey$，並模擬非同步回傳
    if (survey) {
      this.currentSurveySubject.next(survey);
    }
    return of(survey);
  }


  // ----------------------------------------------------------------
  // 管理者：新增與修改問卷
  // ----------------------------------------------------------------

  /**
   * 新增問卷的方法：只更新主要的 fullSurveyData 陣列。
   * 用於：【新增問卷】
   * @param newSurvey 完整的問卷結構
   */
  addSurvey(newSurvey: FullSurvey): void {
    // 實際應用中，會呼叫 API 並等待成功後再更新本地數據
    this.fullSurveyData.push(newSurvey);
    console.log(`新問卷 ID ${newSurvey.id} 已新增`);
    // 列表資料會自動從 fullSurveyData 派生，因此不需要額外更新 listData
  }

  /**
   * 更新問卷的方法：只更新主要的 fullSurveyData 陣列。
   * 用於：【修改問卷】
   * @param updatedSurvey 更新後的問卷結構
   */
  updateSurvey(updatedSurvey: FullSurvey): void {
    const index = this.fullSurveyData.findIndex(s => s.id === updatedSurvey.id);

    if (index > -1) {
      // 替換陣列中的舊資料
      this.fullSurveyData[index] = updatedSurvey;
      console.log(`問卷 ID ${updatedSurvey.id} 已更新`);

      // 如果更新的是當前正在編輯的問卷，也需要廣播更新
      if (this.currentSurveySubject.value?.id === updatedSurvey.id) {
        this.currentSurveySubject.next(updatedSurvey);
      }
    } else {
      console.error(`找不到問卷 ID ${updatedSurvey.id} 無法更新`);
    }
  }

  // ----------------------------------------------------------------
  // 回答與草稿管理 (使用者介面)
  // ----------------------------------------------------------------

  /**
   * 儲存用戶的最終回答 (在 Form Component 中調用)。
   * 用於：【送出問卷】
   */
  submitResponse(response: FormResponse): void {
    // 這裡應該呼叫後端 API 儲存答案
    this.currentResponse = response;
    console.log('問卷回答已提交/暫存:', response);
    // 清除草稿
    this.clearDraftData();
  }

  /**
   * 設定預覽草稿。
   * 用於：【預覽填寫問卷】
   */
  setDraftData(data: ReviewDraft): void {
    this.currentFormDraft = data;
  }

  /**
   * 取得預覽草稿。
   * 用於：【預覽填寫問卷】
   */
  getDraftData(): ReviewDraft | null {
    return this.currentFormDraft;
  }

  /**
   * 清空預覽草稿。
   */
  clearDraftData(): void {
    this.currentFormDraft = null;
  }


  // ----------------------------------------------------------------
  // 模擬資料 (保留您的原始數據，但改為 Service 內部方法)
  // ----------------------------------------------------------------

  private getMockSurveyData(): FullSurvey[] {
    // 您的所有 FullSurvey 數據都集中在這裡
    return [
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
  }
}
