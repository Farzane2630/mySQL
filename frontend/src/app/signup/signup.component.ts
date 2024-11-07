import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { SignupFormType } from '../types';
import { UserServices } from '../services.user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
    ]),
  });

  newUser: SignupFormType = {
    name: '',
    email: '',
    password: '',
  };

  constructor(private userServices: UserServices, private router: Router) {}

  handleSubmit() {
    this.newUser.name = this.signupForm.value.name;
    this.newUser.email = this.signupForm.value.email;
    this.newUser.password = this.signupForm.value.password;

    this.userServices.signupUser(this.newUser).subscribe();

    alert(`Welcome ${this.newUser.name}!`);
    this.router.navigate(['/home-page']);
  }
}
