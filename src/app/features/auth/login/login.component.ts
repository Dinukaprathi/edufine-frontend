import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  formError = '';

  onSubmit(): void {
    this.formError = '';

    if (this.loginForm.invalid) {
      this.formError = 'Please enter your username and password.';
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username } = this.loginForm.value;
    this.formError = `Welcome back, ${username}. Connect to the API to continue.`;
  }
}
