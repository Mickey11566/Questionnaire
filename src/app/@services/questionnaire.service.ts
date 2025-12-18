import { HttpClient, HttpParams } from '@angular/common/http';
import { ListItem, FullSurvey, FormResponse, ReviewDraft, Question, QuizRequest } from './../@interfaces/list-item';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private apiUrl = 'http://localhost:8080/quiz/getall';
  private questionApiUrl = 'http://localhost:8080/quiz/getquestion';

  // ----------------------------------------------------------------
  // 構造函數 (用於初始化)
  // ----------------------------------------------------------------

  constructor(private http: HttpClient) { }

  // ----------------------------------------------------------------
  // 內部狀態管理屬性 (僅 Service 內部使用)
  // ----------------------------------------------------------------

  // 1. 儲存所有完整問卷資料的單一數據源 (管理員介面的核心)
  private fullSurveyData!: FullSurvey[];

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
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => {
        if (res.code !== 200) return [];

        return res.quizList.map((item: any): ListItem => {
          const calculatedStatus = this.calculateStatus(item.startDate, item.endDate);

          return {
            id: item.id,
            name: item.title, // 這裡後端的 title -> name
            description: item.description,
            startDate: item.startDate,
            endDate: item.endDate,
            // 這裡優先使用計算出來的狀態 (尚未開始/進行中/已結束)
            status: calculatedStatus
          };
        })
      })
    )
  }

  /**
   * 根據 ID 獲取單個問卷的完整資料。
   * 用於：【填寫問卷】、【修改問卷】
   * @param id 問卷編號
   */
  getSurveyById(id: number): Observable<FullSurvey | undefined> {
    // 從 API 取得所有列表並從中找出那一筆
    return this.getSurveyListItems().pipe(
      map(list => {
        const found = list.find(item => item.id === id);
        if (found) {
          // 轉換為 FullSurvey 格式 (補上 questions 陣列)
          return { ...found, questions: [] } as FullSurvey;
        }
        return undefined;
      })
    );
  }

  getQuestionsByQuizId(quizId: number): Observable<Question[]> {

    const params = new HttpParams().set('quizId', quizId.toString());

    return this.http.get<any>(this.questionApiUrl, { params }).pipe(
      map(res => {
        console.log('API 原始回傳：', res);
        return res.questionVoList || [];
      })
    );
  }


  // ----------------------------------------------------------------
  // 管理者：新增與修改問卷
  // ----------------------------------------------------------------

  /**
   * 新增問卷的方法：只更新主要的 fullSurveyData 陣列。
   * 用於：【新增問卷】
   * @param newSurvey 完整的問卷結構
   */
  // questionnaire.service.ts

  createQuiz(payload: QuizRequest): Observable<any> {
    return this.http.post<any>('http://localhost:8080/quiz/create', payload);
  }

  /**
   * 更新問卷的方法：只更新主要的 fullSurveyData 陣列。
   * 用於：【修改問卷】
   * @param updatedSurvey 更新後的問卷結構
   */
  updateSurvey(payload: QuizRequest): Observable<any> {
    return this.http.post<any>('http://localhost:8080/quiz/update', payload);
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
   * 提交問卷答案到後端
   * @param payload 包含 quizId 與答案列表的物件
   */
  submitSurvey(payload: any): Observable<any> {
    const url = 'http://localhost:8080/quiz/submit'; // 請根據你後端實際的 API 路徑修改

    // 這裡通常不需要 pipe(map)，直接回傳 Observable 讓 Component 處理訂閱結果即可
    return this.http.post<any>(url, payload);
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

}
