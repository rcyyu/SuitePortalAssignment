import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoginRequest, LoginResponse } from '@suiteportal/api-interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  private _isAdmin = false;
  private _sessionToken = null;
  private _isAuthenticated = false;

  private static readonly AUTH_API_ENDPOINT = `${environment.apiUrl}/auth`;

  getIsAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  getIsAdmin(): boolean {
    return this._isAdmin;
  }

  getSessionToken(): string {
    return this._sessionToken;
  }

  login(request: LoginRequest) {
    const url = `${AuthService.AUTH_API_ENDPOINT}/login`;
    this.http.post<LoginResponse>(url, request).subscribe({
      next: (res) => {
        this._isAdmin = res.isAdmin;
        this._sessionToken = res.sessionToken;
        this._isAuthenticated = res.isAuthenticated;

        if (res.isAuthenticated) {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
