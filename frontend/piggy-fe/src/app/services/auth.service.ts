import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, switchMap, tap, throwError, timer } from 'rxjs';

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from '../models/auth.models';

const TOKEN_KEY = 'piggybank_token';
const USER_KEY = 'piggybank_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/v1';

  // true = risposte finte, false = chiamate vere
  private readonly useMock = true;

  // Utente attualmente loggato
  readonly currentUser = signal<User | null>(this.getUser());

  register(data: RegisterRequest): Observable<User> {
    return this.useMock
      ? this.fakeRegister(data)
      : this.http.post<User>(`${this.baseUrl}/auth/register`, data);
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    const request$ = this.useMock
      ? this.fakeLogin(data)
      : this.http.post<LoginResponse>(
          `${this.baseUrl}/auth/login`,
          data
        );

    return request$.pipe(
      tap((res) => {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));

        // Aggiorna l'utente corrente
        this.currentUser.set(res.user);
      }),
    );
  }

  private fakeRegister(data: RegisterRequest): Observable<User> {
    if (data.email === 'marco.rossi@email.it') {
      return timer(600).pipe(
        switchMap(() =>
          throwError(() => new HttpErrorResponse({ status: 400 }))
        ),
      );
    }

    return timer(600).pipe(
      map(() => ({
        userID: '65f1a2b3c4d5e6f7a8b90199',
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        fullname: `${data.firstname} ${data.lastname}`,
      })),
    );
  }

  private fakeLogin(data: LoginRequest): Observable<LoginResponse> {
    const valid =
      data.email === 'marco.rossi@email.it' &&
      data.password === 'password123';

    if (!valid) {
      return timer(600).pipe(
        switchMap(() =>
          throwError(() => new HttpErrorResponse({ status: 401 }))
        ),
      );
    }

    return timer(600).pipe(
      map(() => ({
        token: 'token-finto',
        user: {
          userID: '65f1a2b3c4d5e6f7a8b90123',
          email: 'marco.rossi@email.it',
          firstname: 'Marco',
          lastname: 'Rossi',
          fullname: 'Marco Rossi',
        },
      })),
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    // Azzera l'utente corrente
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
}

}








/*import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, switchMap, tap, throwError, timer } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from '../models/auth.models';

const TOKEN_KEY = 'piggybank_token';
const USER_KEY = 'piggybank_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = '/v1';
  // true = risposte finte (backend non pronto), false = chiamate vere
  private readonly useMock = true;

  register(data: RegisterRequest): Observable<User> {
    return this.useMock
      ? this.fakeRegister(data)
      : this.http.post<User>(`${this.baseUrl}/auth/register`, data);
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    const request$ = this.useMock
      ? this.fakeLogin(data)
      : this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, data);

    return request$.pipe(
      tap((res) => {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
      }),
    );
  }

  // Solo per sviluppo: l'email del riquadro demo risulta già registrata
  private fakeRegister(data: RegisterRequest): Observable<User> {
    if (data.email === 'marco.rossi@email.it') {
      return timer(600).pipe(
        switchMap(() => throwError(() => new HttpErrorResponse({ status: 400 }))),
      );
    }

    return timer(600).pipe(
      map(() => ({
        userID: '65f1a2b3c4d5e6f7a8b90199',
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        fullname: `${data.firstname} ${data.lastname}`,
      })),
    );
  }

  // Solo per sviluppo: simula il backend finché non è pronto.
  private fakeLogin(data: LoginRequest): Observable<LoginResponse> {
    const valid =
      data.email === 'marco.rossi@email.it' && data.password === 'password123';

    if (!valid) {
      return timer(600).pipe(
        switchMap(() => throwError(() => new HttpErrorResponse({ status: 401 }))),
      );
    }

    return timer(600).pipe(
      map(() => ({
        token: 'token-finto',
        user: {
          userID: '65f1a2b3c4d5e6f7a8b90123',
          email: 'marco.rossi@email.it',
          firstname: 'Marco',
          lastname: 'Rossi',
          fullname: 'Marco Rossi',
        },
      })),
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}*/