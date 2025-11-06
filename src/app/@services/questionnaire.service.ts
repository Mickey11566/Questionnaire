import { ListItem } from './../@interfaces/list-item';
import { Injectable } from '@angular/core';
import { ReviewDraft } from './../@interfaces/list-item';


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
      result: "前往"
    },
    {
      id: 2,
      name: '公司環境與文化問卷',
      description: "良好的工作環境能激發員工的潛力。那麼，公司文化與氛圍的營造，究竟該如何影響員工滿意度呢？",
      status: "尚未開始",
      startDate: "2025-11-20",
      endDate: "2025-12-05",
      result: "前往"
    },
    {
      id: 3,
      name: '員工健康與壓力調查',
      description: "健康是一切的基礎。當壓力成為日常的一部分，我們該如何維持心理與身體的平衡？",
      status: "進行中",
      startDate: "2025-11-03",
      endDate: "2025-11-20",
      result: "前往"
    },
    {
      id: 4,
      name: '遠端工作經驗問卷',
      description: "隨著科技發展，遠端工作已成常態。你對遠端工作的效率與挑戰有何看法？",
      status: "尚未開始",
      startDate: "2025-12-01",
      endDate: "2025-12-15",
      result: "前往"
    },
    {
      id: 5,
      name: '年度培訓成效評估',
      description: "學習與成長是企業發展的核心。培訓是否真的讓你有所收穫？",
      status: "已結束",
      startDate: "2025-10-01",
      endDate: "2025-10-10",
      result: "前往"
    },
    {
      id: 6,
      name: '部門合作滿意度調查',
      description: "團隊合作是成功的基礎。你認為跨部門溝通是否順暢？",
      status: "進行中",
      startDate: "2025-11-05",
      endDate: "2025-11-18",
      result: "前往"
    },
    {
      id: 7,
      name: '工作與生活平衡問卷',
      description: "當生活節奏越來越快，如何在工作與家庭之間取得平衡，成為許多人心中的課題。",
      status: "尚未開始",
      startDate: "2025-11-25",
      endDate: "2025-12-05",
      result: "前往"
    },
    {
      id: 8,
      name: '內部溝通效率調查',
      description: "有效的溝通能提升團隊的凝聚力。你認為目前的資訊流通是否足夠透明？",
      status: "進行中",
      startDate: "2025-11-02",
      endDate: "2025-11-17",
      result: "前往"
    },
    {
      id: 9,
      name: '新進員工適應情況問卷',
      description: "對新員工而言，入職初期的體驗非常關鍵。你是否覺得公司的培訓與輔導足夠完善？",
      status: "已結束",
      startDate: "2025-09-15",
      endDate: "2025-09-30",
      result: "前往"
    },
    {
      id: 10,
      name: '主管領導風格評估',
      description: "領導風格影響團隊氛圍與績效。你認為主管在激勵與指導上表現如何？",
      status: "進行中",
      startDate: "2025-11-01",
      endDate: "2025-11-12",
      result: "前往"
    },
    {
      id: 11,
      name: '顧客服務品質調查',
      description: "顧客滿意是品牌成功的關鍵。你認為我們的服務流程是否友善且高效？",
      status: "尚未開始",
      startDate: "2025-12-10",
      endDate: "2025-12-25",
      result: "前往"
    },
    {
      id: 12,
      name: '產品滿意度調查',
      description: "產品品質與使用體驗密不可分。你的使用感受是否符合預期？",
      status: "已結束",
      startDate: "2025-10-10",
      endDate: "2025-10-20",
      result: "前往"
    },
    {
      id: 13,
      name: '年度活動回饋問卷',
      description: "每一次活動的舉辦，都是團隊努力的成果。你的參與體驗如何？",
      status: "已結束",
      startDate: "2025-09-20",
      endDate: "2025-09-30",
      result: "前往"
    },
    {
      id: 14,
      name: '福利制度滿意度調查',
      description: "福利制度不僅反映企業文化，也影響員工忠誠度。你對現行制度的滿意度如何？",
      status: "進行中",
      startDate: "2025-11-04",
      endDate: "2025-11-18",
      result: "前往"
    },
    {
      id: 15,
      name: '公司整體滿意度調查',
      description: "公司整體的發展與員工感受息息相關。你的滿意度能幫助我們持續改善。",
      status: "尚未開始",
      startDate: "2025-11-25",
      endDate: "2025-12-05",
      result: "前往"
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
}


