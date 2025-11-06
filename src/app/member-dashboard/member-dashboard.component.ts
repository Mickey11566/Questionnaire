import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// sweetalert
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: "是否真的要修改個人資訊?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      position: "center",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          title: "修改成功!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
        setTimeout(() => {
          this.router.navigateByUrl("list");
        }, 1500);
      }
    });
  }
  goBack() {
    this.router.navigateByUrl("list");
  }
}
