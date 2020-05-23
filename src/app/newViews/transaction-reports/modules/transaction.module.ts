import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TransactionRoutingModule } from "./transaction-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataTablesModule } from "angular-datatables";
import { LoadingSpinnerModule } from "src/app/ui/loading-spinner/loading-spinner.module";
import { TransactionReportsComponent } from "../transaction-reports.component";
@NgModule({
  declarations: [TransactionReportsComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    NgbModule,
    LoadingSpinnerModule,
    DataTablesModule
  ]
})
export class TransactionModule {}
