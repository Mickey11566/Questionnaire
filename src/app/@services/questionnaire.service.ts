import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  // 問卷資訊 如標題、說明等
  name!: string; //問卷名稱
  description!: string; //問卷說明
  no!: number;//問卷編號
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

  constructor() { }
}
