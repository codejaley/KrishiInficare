import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VendorRoutingModule } from "./vendor-routing.module";

import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerModule } from "src/app/ui/loading-spinner/loading-spinner.module";
import { QRCodeModule } from "angularx-qrcode";

import { VendorComponent } from "../vendor.component";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { MatProgressSpinnerModule } from "@angular/material";

@NgModule({
  declarations: [VendorComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    LoadingSpinnerModule
  ]
})
export class VendorModule {}
