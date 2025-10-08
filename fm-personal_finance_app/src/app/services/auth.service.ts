import { Injectable, effect, signal } from '@angular/core';

const STORAGE_KEY = 'personal_finances_logged_in';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly loggedIn = signal(this.readPersistedState());

  constructor() {
    effect(() => {
      this.persistState(this.loggedIn());
    });
  }

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  login(): void {
    this.loggedIn.set(true);
  }

  logout(): void {
    this.loggedIn.set(false);
  }

  private readPersistedState(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  }

  private persistState(state: boolean): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, state ? 'true' : 'false');
  }
}
