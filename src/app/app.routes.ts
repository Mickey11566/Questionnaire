import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { ReviewComponent } from './review/review.component';
import { ResultComponent } from './result/result.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: "list", component: ListComponent,
  },

  {
    path: "form", component: QuestionFormComponent,
  },

  {
    path: "review", component: ReviewComponent,
  },

  {
    path: "result", component: ResultComponent,
  },
  {
    path: "login", component: LoginComponent,
  },
  {
    path: "register", component: RegisterComponent,
  },

  { path: "", redirectTo: "login", pathMatch: 'prefix' }

];
