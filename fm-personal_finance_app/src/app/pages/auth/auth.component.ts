import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./auth.component.css'],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  readonly form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  private readonly routeData = toSignal(this.route.data, {
    initialValue: this.route.snapshot.data
  });

  readonly mode = computed(() => (this.routeData()['mode'] as 'login' | 'signup') ?? 'login');

  get headline(): string {
    return this.mode() === 'login' ? 'Welcome back' : 'Create an account';
  }

  get buttonLabel(): string {
    return this.mode() === 'login' ? 'Log in' : 'Create account';
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.login();
    this.router.navigate(['/overview']);
  }

  navigateToAlternative(): void {
    this.router.navigate([this.mode() === 'login' ? '/signup' : '/login']);
  }
}
