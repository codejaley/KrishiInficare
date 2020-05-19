import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomerRoutingModule } from "./customer-routing.module";

import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerModule } from "src/app/ui/loading-spinner/loading-spinner.module";
import { QRCodeModule } from "angularx-qrcode";

import { CustomerComponent } from "../customer.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AddcustomerComponent } from "../addcustomer/addcustomer.component";
import { UpdatecustomerComponent } from "../updatecustomer/updatecustomer.component";
import { QrcodeComponent } from "../qrcode/qrcode.component";
import { MatProgressSpinnerModule } from "@angular/material";

@NgModule({
  declarations: [
    CustomerComponent,
    AddcustomerComponent,
    UpdatecustomerComponent,
    QrcodeComponent
  ],
  entryComponents: [
    AddcustomerComponent,
    UpdatecustomerComponent,
    QrcodeComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerModule,
    MatCheckboxModule,
    QRCodeModule,
    MatProgressSpinnerModule
  ]
})
export class CustomerModule {}