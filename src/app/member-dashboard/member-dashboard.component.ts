import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-member-dashboard',
  imports: [MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule],
  templateUrl: './member-dashboard.component.html',
  styleUrl: './member-dashboard.component.scss'
})
export class MemberDashboardComponent {

  userEmail!: string;

  userPassword!: string;
  pwdHide: boolean = true;
  userName!: string;
  userPhone!: string;

  constructor(private router: Router) { }


  // 用sweetAlert製作動畫
  // https://sweetalert2.github.io/#handling-buttons
  Submit() {
    this.router.navigateByUrl("list");
  }
  goBack() {

    this.router.navigateByUrl("list");
  }
}
