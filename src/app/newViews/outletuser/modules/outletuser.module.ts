import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OutletuserRoutingModule } from "./outletuser-routing.module";

import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerModule } from "src/app/ui/loading-spinner/loading-spinner.module";
import { QRCodeModule } from "angularx-qrcode";

import { OutletuserComponent } from "../outletuser.component";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { MatProgressSpinnerModule } from "@angular/material";
import { AddoutletuserComponent } from "../addoutletuser/addoutletuser.component";
import { UpdateoutletuserComponent } from "../updateoutletuser/updateoutletuser.component";

@NgModule({
  declarations: [
    OutletuserComponent,
    AddoutletuserComponent,
    UpdateoutletuserComponent
  ],
  imports: [
    CommonModule,
    OutletuserRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerModule,
    QRCodeModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ]
})
export class OutletuserModule {}
