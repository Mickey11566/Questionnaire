import { Router } from '@angular/router';
import { QuestionnaireService } from './../@services/questionnaire.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  userName!: string;
  userEmail!: string;
  userPhone!: string;
  userAge!: number;

  constructor(private questionnaireService: QuestionnaireService, private router: Router) { }

  ngOnInit(): void {

    this.userName = this.questionnaireService.inputName;
    this.userEmail = this.questionnaireService.inputEmail;
    this.userPhone = this.questionnaireService.inputPhone;
    this.userAge = this.questionnaireService.inputAge;
  }

  comfirm() {
    console.log("123");
  }

  back() {
    this.router.navigateByUrl("/form");
  }
}
