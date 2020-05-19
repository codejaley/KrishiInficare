import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable } from "rxjs";
import { catchError, mapTo, tap, timeout } from "rxjs/operators";
import { config } from "./../../config";
import { Tokens } from "../models/tokens";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";

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
    private router: Router
  ) {}

  login(user: {
    UserName: string;
    Password: string;
    AccessCode: number;
  }): Observable<boolean> {
    return this.http
      .post<any>(`${config.apiUrl}/api/Accounts/ValidLogin`, user)
      .pipe(
        timeout(20000),
        tap(tokens => this.doLoginUser(user.UserName, tokens)),

        mapTo(true),
        catchError(error => {
          if (error) {
            console.log(error);
            this.toastr.warning(error.name, "Invalid Username or password");
          } else {
            return of(false);
          }
        })
      );
  }

  logout() {
    return this.http
      .post<any>(`${config.apiUrl}/api/Accounts/logout`, {
        value: this.getRefreshToken()
      })
      .pipe(
        tap(() => this.doLogoutUser()),
        mapTo(true),
        catchError(error => {
          console.log(error);
          // return of(false);
          return of(false);
        })
      );
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http
      .post<any>(`${config.apiUrl}/api/Accounts/RefreshToken`, {
        value: this.getRefreshToken()
      })
      .pipe(
        tap((tokens: Tokens) => {
          this.storeJwtToken(tokens.Token);
        })
      );
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
    if (jwt == null || jwt == undefined) {
      this.toastr.info("SESSION EXPIRED");
      this.removeTokens();
      this.router.navigate(["/login"]);
    } else {
      sessionStorage.setItem(this.JWT_TOKEN, jwt);
    }
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
