import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/containers/login/login.component";

import { AuthGuard } from "./auth/guards/auth.guard";

import { PagenotfoundComponent } from "./views/pagenotfound/pagenotfound.component";
import { DashboardGuard } from "./dashboard/guards/dashboard.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardModule",
    canActivate: [DashboardGuard],
    canLoad: [DashboardGuard]
  },
  { path: "**", pathMatch: "full", redirectTo: "/login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
