import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  name!: string;
  no!: number;
  status!: string;
  startDate!: string;
  endDate!: string;
  result!: string;
  constructor() { }
}
