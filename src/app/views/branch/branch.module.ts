import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BranchRoutingModule } from "./branch-routing.module";

import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerModule } from "src/app/ui/loading-spinner/loading-spinner.module";

import { BranchComponent } from "../branch/branch.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
@NgModule({
  declarations: [BranchComponent],
  imports: [
    CommonModule,
    BranchRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerModule,
    MatCheckboxModule
  ]
})
export class BranchModule {}
