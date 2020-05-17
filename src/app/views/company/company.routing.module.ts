import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompanyComponent } from "./company.component";

const companyroutes: Routes = [
  {
    path: "",
    component: CompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(companyroutes)],
  exports: [RouterModule],
  declarations: []
})
export class CompanyRoutingModule {}
