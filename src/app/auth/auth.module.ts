import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./containers/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";
import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./services/auth.service";

import { TokenInterceptor } from "./token.interceptor";
import { DashboardGuard } from "../dashboard/guards/dashboard.guard";

import { MatProgressSpinnerModule } from "@angular/material";

@NgModule({
  declarations: [LoginComponent],
  providers: [
    AuthGuard,
    AuthService,
    DashboardGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class AuthModule {}
