import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';


import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-form',
  imports: [MatIconModule,
    MatInputModule,
    MatFormFieldModule, MatDatepickerModule,
    FormsModule],
  templateUrl: './add-form.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './add-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AddFormComponent {

  inputTitle!: string;
  inputDescription!: string;

  constructor(private router: Router) { }

  toSettings() {
    console.log(this.inputTitle + this.inputDescription);

  }

  toList() {
    this.router.navigateByUrl("manage");
  }

  list() {
    this.router.navigateByUrl("manage");
  }

  logout() {
    this.router.navigateByUrl("login");
  }
}
