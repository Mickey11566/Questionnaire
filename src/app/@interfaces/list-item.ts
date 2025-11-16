// -----------------------------------------------------------
// 1. 問卷列表基本資訊 (用於列表顯示)
// -----------------------------------------------------------
export interface ListItem {
  id: number; // 問卷編號
  name: string; // 問卷名稱
  description: string; // 問卷說明
  status: string; // 問卷狀態 (如: "進行中", "尚未開始")
  startDate: string; // 問卷開始日期 'YYYY-MM-DD'
  endDate: string; // 問卷結束日期 'YYYY-MM-DD'
}

// -----------------------------------------------------------
// 2. 題目結構 (用於定義問卷內容)
// -----------------------------------------------------------

// 定義單個問卷題目的介面
export interface Question {
  id: number; // 題目 ID (在單一問卷內唯一)
  text: string; // 題目內容
  type: 'single' | 'multiple' | 'short-answer'; // 題目類型
  required: boolean; // 是否必填
  options?: string[]; // 選項 (適用於多選和單選)
}


// -----------------------------------------------------------
// 3. 完整的問卷定義 (包含基本資訊和題目列表)
// -----------------------------------------------------------
export interface Survey extends ListItem {

  // 額外新增的題目屬性
  questions: Question[];
}

// 最終資料結構
export interface CurrentFormData extends ListItem {
  questions: Question[];
}

// -----------------------------------------------------------
// 4. 問卷回答/草稿結構 (用於使用者填寫問卷時的資料)
// -----------------------------------------------------------
export interface ReviewDraft {
  // 基礎資訊 (可以從填寫問卷的頁面帶入)
  surveyId: number; // 識別是哪一份問卷的答案
  surveyName?: string;


  // 動態問卷的答案，使用 Record<string, any> 來適應任何問答
  answers: Record<string, any>;

  // 如果您需要包含填寫的時間，可以新增
  submittedAt?: Date;
}

export interface UserAnswer {
  questionId: number;
  answer: string | string[]; // 單選和簡答是 string，複選是 string[]
}

export interface FormResponse {
  surveyId: number;
  answers: UserAnswer[];
  // 其他必要資訊，如填寫時間戳等
}
