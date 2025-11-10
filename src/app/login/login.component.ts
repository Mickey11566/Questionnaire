import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


// sweetalert
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  matcher = new MyErrorStateMatcher();

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
        this.router.navigateByUrl('list')
      }, 1300);
    }
  }

  goRegister() {
    this.isFlipping = true;
    setTimeout(() => {
      this.router.navigateByUrl('register');
      this.isFlipping = false;
    }, 600)
  }

  admin() {
    this.router.navigateByUrl('admin');

  }

}
