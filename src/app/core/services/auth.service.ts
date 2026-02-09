import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  username: string;
  role: string;
  permissions: Record<string, boolean>;
}

const API = 'http://localhost:8080/api/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private readonly tokenKey = 'auth_token';
  private readonly usernameKey = 'auth_username';
  private readonly roleKey = 'auth_role';
  private readonly permissionsKey = 'auth_permissions';

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API}/login`, request).pipe(
      tap(response => this.storeSession(response))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.permissionsKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  getPermissions(): Record<string, boolean> {
    const stored = localStorage.getItem(this.permissionsKey);
    return stored ? JSON.parse(stored) : {};
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private storeSession(response: LoginResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.usernameKey, response.username);
    localStorage.setItem(this.roleKey, response.role);
    localStorage.setItem(this.permissionsKey, JSON.stringify(response.permissions || {}));
  }
}
