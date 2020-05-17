import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ToastrModule } from "ngx-toastr";

import { CookieService } from "ngx-cookie-service";

import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { AppRoutingModule } from "./app.routing.module";
import { DashboardModule } from "./dashboard/dashboard.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    AuthModule,
    ToastrModule.forRoot(),
    DashboardModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
