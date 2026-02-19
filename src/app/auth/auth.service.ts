import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, map } from 'rxjs';

export interface StrapiUser {
  id: number;
  username: string;
  email: string;
}

export interface MembreProfile {
  id: number;
  nom: string;
  initiales: string;
  role: string;
  description?: string;
  couleur: string;
  numero_membre: string;
  email?: string;
  date_adhesion?: string;
  cotisations?: any[];
}

interface AuthResponse {
  jwt: string;
  user: StrapiUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:1337/api';
  private _user = signal<StrapiUser | null>(this.loadUser());
  private _membre = signal<MembreProfile | null>(null);

  user = this._user.asReadonly();
  membre = this._membre.asReadonly();
  isAuthenticated = computed(() => !!this._user());

  constructor(private http: HttpClient, private router: Router) {}

  login(identifier: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/local`, { identifier, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('jwt', res.jwt);
          localStorage.setItem('user', JSON.stringify(res.user));
          this._user.set(res.user);
        })
      );
  }

  fetchMembreProfile(): Observable<MembreProfile> {
    return this.http
      .get<{ data: MembreProfile }>(`${this.apiUrl}/membres/me`)
      .pipe(
        map((res) => res.data),
        tap((membre) => this._membre.set(membre))
      );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this._user.set(null);
    this._membre.set(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  private loadUser(): StrapiUser | null {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  }
}
