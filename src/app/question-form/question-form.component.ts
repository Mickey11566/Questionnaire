import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { QuestionnaireService } from '../@services/questionnaire.service';
import { FormsModule } from '@angular/forms';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-question-form',
  imports: [RouterLink, FormsModule, ReviewComponent],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss'
})
export class QuestionFormComponent {

  inputName!: string;
  inputEmail!: string;
  inputPhone!: string;
  inputAge!: number;
  description!: string;
  name!: string;


  // 將資料包成json格式 傳送至review
  // 在透過review.ts 去拆解json
  submitData() {
    this.questionnaireService.inputAge = this.inputAge;
    this.questionnaireService.inputPhone = this.inputPhone;
    this.questionnaireService.inputEmail = this.inputEmail;
    this.questionnaireService.inputName = this.inputName;
    this.router.navigateByUrl('/review');
  }

  constructor(private router: Router, private questionnaireService: QuestionnaireService) { }
}
