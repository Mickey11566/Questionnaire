import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { ReviewComponent } from './review/review.component';
import { ResultComponent } from './result/result.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageComponent } from './manage/manage.component';
import { AddFormComponent } from './add-form/add-form.component';
import { CheckFormComponent } from './check-form/check-form.component';

export const routes: Routes = [
  {
    path: "list", component: ListComponent,
  },

  {
    path: "form/:id", component: QuestionFormComponent,
  },

  {
    path: "profile", component: MemberDashboardComponent,
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

  {
    path: "admin", component: AdminComponent,
  },
  {
    path: "manage", component: ManageComponent
  },
  {
    path: "addForm", component: AddFormComponent
  },
  {
    path: "checkForm/:id", component: CheckFormComponent
  },
  // 修改問卷 (使用相同的元件，並可以接收 ID 查詢參數)
  { path: 'survey/edit', component: AddFormComponent },

  { path: "", redirectTo: "login", pathMatch: 'prefix' }

];
