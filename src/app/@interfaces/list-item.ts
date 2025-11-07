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
