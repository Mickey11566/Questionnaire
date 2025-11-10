export interface ListItem {
  name: string; //問卷名稱
  description: string; //問卷說明
  id: number;//問卷編號
  status: string; //問卷狀態
  startDate: string; //問卷開始日期
  endDate: string;//問卷結束日期
}


// 使用一個通用的介面來包含基本資訊和動態答案
export interface ReviewDraft {
  // 來自 QuestionFormComponent 的基本資訊
  questionnaireId: number;
  questionnaireName: string;
  questionnaireDescription: string;

  // 動態問卷的答案，使用 Record<string, any> 來適應任何問答
  answers: Record<string, any>;
}


// TodoList

// 問卷表單網站TodoList
// Email輸入欄錯誤通知 (ex.格式或無輸入)
// 預覽返回資料存留 (ex. 若預覽回答的答案有誤返回要將資料傳回去)
// 新增問卷功能 (ex. 新增問卷選項及日期傳遞)
// 預覽問卷 (ex. 新增問卷問題時 若完成了 要出現預覽)
// 對應問卷內容顯示 (顯示不同問卷的問題)
// 對應問卷結果顯示 (顯示不同問卷的統計結果)
