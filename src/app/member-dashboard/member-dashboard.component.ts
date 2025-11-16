import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, Validators } from '@angular/forms';
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

  //密碼長度
  readonly minLength = 6;

  // email及密碼輸入確認
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)]);
  nameFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [Validators.required]);

  constructor(private router: Router) { }

  Submit() {
    if (
      this.userPassword &&
      this.userName &&
      this.userPhone) {
      Swal.fire({
        title: "是否真的要修改個人資訊?",
        icon: "warning",
        showConfirmButton: true,
        showCancelButton: true,
        position: "center",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
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
      })
    }
    else {
      Swal.fire({
        title: "修改失敗！",
        text: "請輸入必填的內容",
        icon: "error",
        timer: 1500,
        showConfirmButton: false
      });
    };
  }
  goBack() {
    this.router.navigateByUrl("list");
  }
}
