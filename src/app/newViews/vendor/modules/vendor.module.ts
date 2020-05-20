import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VendorRoutingModule } from "./vendor-routing.module";

import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerModule } from "src/app/ui/loading-spinner/loading-spinner.module";

import { VendorComponent } from "../vendor.component";
import { AddvendorComponent } from "../addvendor/addvendor.component";
import { UpdatevendorComponent } from "../updatevendor/updatevendor.component";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { MatProgressSpinnerModule } from "@angular/material";

@NgModule({
  declarations: [VendorComponent, AddvendorComponent, UpdatevendorComponent],
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
