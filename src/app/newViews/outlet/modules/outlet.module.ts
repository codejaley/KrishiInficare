import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OutletRoutingModule } from "./outlet-routing.module";

import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerModule } from "src/app/ui/loading-spinner/loading-spinner.module";
import { QRCodeModule } from "angularx-qrcode";

import { OutletComponent } from "../outlet.component";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { MatProgressSpinnerModule } from "@angular/material";

@NgModule({
  declarations: [OutletComponent],
  imports: [
    CommonModule,
    OutletRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ]
})
export class OutletModule {}