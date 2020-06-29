import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable, throwError } from "rxjs";
import { catchError, mapTo, tap, timeout } from "rxjs/operators";
import { config } from "./../../config";
import { Tokens } from "../models/tokens";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { error } from "util";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
  private loggedUser: string;

  Response: any;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private cs: CookieService
  ) {}

  login(user: {
    UserName: string;
    Password: string;
    AccessCode: number;
  }): Observable<boolean> {
    return this.http
      .post<any>(`${config.apiUrl}/api/Accounts/ValidLogin`, user)
      .pipe(
        timeout(8000),
        tap(tokens => this.doLoginUser(user.UserName, tokens)),

        mapTo(true),
        catchError(error => {
          this.toastr.clear();
          return throwError(error);
        })
      );
  }

  logout() {
    return this.http
      .post<any>(`${config.apiUrl}/api/Accounts/Logout`, {
        refreshToken: this.getRefreshToken()
      })
      .pipe(
        tap(() => this.doLogoutUser()),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      );
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return; /* this.http
      .post<any>(`${config.apiUrl}/api/Accounts/RefreshToken`, {
        value: this.getRefreshToken()
      })
      .pipe(
        tap((tokens: Tokens) => {
          this.storeJwtToken(tokens.Token);
        })
      ); */
  }

  getJwtToken() {
    return sessionStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return sessionStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    sessionStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    sessionStorage.setItem(this.JWT_TOKEN, tokens.Token);
    sessionStorage.setItem(this.REFRESH_TOKEN, tokens.RefreshToken);
  }

  private removeTokens() {
    sessionStorage.removeItem(this.JWT_TOKEN);
    sessionStorage.removeItem(this.REFRESH_TOKEN);
  }
}
