import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MerchantComponent } from "./merchant.component";

const merchantroutes: Routes = [
  {
    path: "",
    component: MerchantComponent
  },
  { path: "**", pathMatch: "full", redirectTo: "/dashboard/company" }
];

@NgModule({
  imports: [RouterModule.forChild(merchantroutes)],
  exports: [RouterModule],
  declarations: []
})
export class MerchantRoutingModule {}
