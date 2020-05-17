import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MerchantUserComponent } from "../merchant-user.component";

const routes: Routes = [
  {
    path: "",
    component: MerchantUserComponent
  },
  { path: "**", pathMatch: "full", redirectTo: "/dashboard/company" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantuserRoutingModule {}
