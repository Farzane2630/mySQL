import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { LoginFormType } from '../types';
import { UserServices } from '../services.user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  loginFormValue: LoginFormType = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private userServices: UserServices) {}

  handleSubmit() {
    this.loginFormValue = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.userServices.loginUser(this.loginFormValue).subscribe({
      next: (res) => {
        alert(`welcome back ${res.user.name}!`);
        this.router.navigate(['/home-page']);
      },
      error: (err) => {
        alert(err.error.message || 'Login Failed');
      },
    });
  }
}
