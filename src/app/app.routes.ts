import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { QuestionFormComponent } from './question-form/question-form.component';

export const routes: Routes = [
  {
    path: "list", component: ListComponent,
  },

  { path: "form", component: QuestionFormComponent },
  { path: "form/:id", component: QuestionFormComponent },
  { path: "", component: ListComponent },
];
