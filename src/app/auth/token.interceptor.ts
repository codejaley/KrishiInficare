import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: NgbModal
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true,
      reportProgress: true
    });
    /*   if (this.authService.getJwtToken()) {

    } */
    //request = this.addToken(request);
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (
            (error instanceof HttpErrorResponse &&
              error.status === 401 &&
              error.statusText == "Session Expired") ||
            error.statusText == "Invalid Token"
          ) {
            sessionStorage.clear();
            this.toastr.warning(error.statusText, error.status.toString());
            this.dialog.dismissAll();
            this.router.navigate(["/login"]);
          }
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  /*   private addToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        //withCredentials: `true`,
        //Authorization: `Bearer ${token}`,
        someheader: `testCSRGF`
      }
    });
  } */

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request);
    //this.addToken(request)
    /*  if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.Token);

        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(Token => {
          return next.handle(this.addToken(request, Token));
        })
      );
    } */
  }
}
