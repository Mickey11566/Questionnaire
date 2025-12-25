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

export interface QuestionOption {
  code: number;
  optionName: string;
}

// 定義單個問卷題目的介面
export interface Question {
  quizId: number;
  questionId: number;
  question: string;
  type: 'single' | 'multiple' | 'short-answer'; // 題目類型
  required: boolean; // 是否必填
  optionsList: QuestionOption[];
}

// Review 顯示的資料結構
export interface ReviewQuestion extends Question {
  userAnswerText: string;
}

// 對齊後端
export interface QuizRequest {
  id?: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  published: boolean;
  questionVoList: any[];
}

// -----------------------------------------------------------
// 3. 完整的問卷定義 (包含基本資訊和題目列表)
// -----------------------------------------------------------
export interface FullSurvey extends ListItem {

  // 額外新增的題目屬性
  questions: Question[];
}

// 最終資料結構
export interface CurrentFormData extends ListItem {
  questions: Question[];
}

// 假設這裡定義一個用於顯示的結構，包含問題文本和用戶答案
export interface ReviewItem {
  questionText: string;
  questionType: string;
  userAnswer: any;
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
  lastSaved?: Date; // 最近一次儲存時間
}

export interface UserAnswer {
  questionId: number;
  answer: string | string[]; // 單選和簡答是 string，複選是 string[]
}

export interface FormResponse {
  surveyId: number;
  answers: UserAnswer[];
  submittedAt?: Date; // 提交時間
}



// -----------------------------------------------------------
// 5. 統計問卷結果
// -----------------------------------------------------------
export interface ChartResult {
  label: string;
  count: number;
}

export interface TextResult {
  content: string;
}

export interface StatisticItem {
  questionId: number;
  questionName: string;
  type: 'single' | 'multiple' | 'short-answer';
  results: (ChartResult | TextResult)[]; // 這裡允許兩種類型並存
}
