import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CompanyRoutingModule } from "./company.routing.module";
import { LoadingSpinnerModule } from "src/app/ui/loading-spinner/loading-spinner.module";
import { CompanyComponent } from "./company.component";
import { AddCompanyComponent } from "./add-company/add-company.component";
import { ViewcompanyComponent } from "./viewcompany/viewcompany.component";
import { DataTablesModule } from "angular-datatables";
import { UpdatecompanyComponent } from "./updatecompany/updatecompany.component";
import { MerchantRoutingModule } from "./merchant/merchant.routing.module";
@NgModule({
  declarations: [
    CompanyComponent,
    AddCompanyComponent,
    ViewcompanyComponent,
    UpdatecompanyComponent
  ],
  entryComponents: [
    AddCompanyComponent,
    ViewcompanyComponent,
    UpdatecompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    LoadingSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    MerchantRoutingModule
  ]
})
export class CompanyModule {}
