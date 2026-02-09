import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  readonly loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  formError = '';
  isSubmitting = false;

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    this.formError = '';

    if (this.loginForm.invalid) {
      this.formError = 'Please enter your username and password.';
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();

    this.isSubmitting = true;
    this.authService.login({
      username: (username || '').trim(),
      password: password || ''
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toastService.showSuccess('Signed in', 'Welcome back to EduFine.');
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      error: () => {
        this.isSubmitting = false;
        this.formError = 'Invalid username or password.';
        this.toastService.showError('Sign in failed', 'Check your username and password.');
      }
    });
  }
}
