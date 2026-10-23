import { computed, Injectable, inject, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable, tap } from 'rxjs';

export interface AuthUser {
  id: number;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly _user = signal<AuthUser | null>(this.readStoredUser());
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        const user: AuthUser = {
          id: response.userId,
          email: credentials.email,
        };
        localStorage.setItem('token', response.id);
        localStorage.setItem('auth-user', JSON.stringify(user));
        this._user.set(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('auth-user');
    this._user.set(null);
  }

  private readStoredUser(): AuthUser | null {
    const token = localStorage.getItem('token');
    const rawUser = localStorage.getItem('auth-user');

    if (!token || !rawUser) {
      return null;
    }

    try {
      const user: unknown = JSON.parse(rawUser);
      if (
        typeof user === 'object' &&
        user !== null &&
        'id' in user &&
        'email' in user &&
        typeof user.id === 'number' &&
        typeof user.email === 'string'
      ) {
        return user as AuthUser;
      }
    } catch {
      localStorage.removeItem('auth-user');
    }

    return null;
  }
}
