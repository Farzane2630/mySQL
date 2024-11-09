import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginFormType } from "./types";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserServices {
  private ApiUrl = "http://127.0.0.1:8000";
  private tokenKey = "authToken";

  constructor(private http: HttpClient) {}

  signupUser(userInfo: LoginFormType): Observable<any> {
    return this.http.post(`${this.ApiUrl}/users`, userInfo);
  }

  loginUser(userInfo: LoginFormType): Observable<any> {
    return this.http
      .post<{
        token: string;
        user: { id: number; email: string; name: string };
      }>(`${this.ApiUrl}/login`, userInfo)
      .pipe(
        tap((response) => {
          if (response && response.user) {
            localStorage.setItem("token", response.token);
          } else {
            console.error("Login failed: No token received");
          }
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  // Get the token from local storage
  getToken(): string | null {
    return localStorage.getItem("token");
  }

  // Log out the user by removing the token from local storage
  logout(): void {
    localStorage.removeItem("token");
  }
}
