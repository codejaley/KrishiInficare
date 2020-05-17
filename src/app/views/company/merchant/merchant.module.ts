import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MerchantRoutingModule } from "./merchant.routing.module";

import { DataTablesModule } from "angular-datatables";
import { LoadingSpinnerModule } from "src/app/ui/loading-spinner/loading-spinner.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { MerchantComponent } from "./merchant.component";
import { AddmerchantComponent } from "./addmerchant/addmerchant.component";
import { UpdatedmerchantComponent } from "./updatedmerchant/updatedmerchant.component";
@NgModule({
  declarations: [
    MerchantComponent,
    AddmerchantComponent,
    UpdatedmerchantComponent
  ],
  entryComponents: [AddmerchantComponent, UpdatedmerchantComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    DataTablesModule,
    LoadingSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  exports: []
})
export class MerchantModule {}
