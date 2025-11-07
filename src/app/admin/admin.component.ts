import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';


// sweetalert
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  userEmail!: string;
  userPassword!: string;

  // 密碼隱藏顯示
  pwdHide: boolean = true;

  //翻轉卡片
  isFlipping: boolean = false;

  constructor(private router: Router) { }
  login() {
    if (this.userEmail == "123" || this.userPassword == "123") {
      Swal.fire({
        title: "登入失敗!",
        text: "帳號或密碼格式錯誤",
        icon: "error",
      });
    }
    else {
      Swal.fire({
        title: "登入成功!",
        icon: "success",
        timer: 1200,
        showConfirmButton: false
      });
      setTimeout(() => {
        this.router.navigateByUrl('manage')
      }, 1300);
    }
  }

}
