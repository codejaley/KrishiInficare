import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OutletRoutingModule } from "./outlet-routing.module";

import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerModule } from "src/app/ui/loading-spinner/loading-spinner.module";
import { QRCodeModule } from "angularx-qrcode";

import { OutletComponent } from "../outlet.component";
import { AddoutletComponent } from "../addoutlet/addoutlet.component";
import { UpdateoutletComponent } from "../updateoutlet/updateoutlet.component";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { MatProgressSpinnerModule } from "@angular/material";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
@NgModule({
  declarations: [OutletComponent, AddoutletComponent, UpdateoutletComponent],
  entryComponents: [AddoutletComponent, UpdateoutletComponent],
  imports: [
    CommonModule,
    OutletRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    NgbModule
  ]
})
export class OutletModule {}
