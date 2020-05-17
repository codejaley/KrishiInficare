import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransactionfeeModule } from "./../transactionfee/transactionfee.module";

import { MerchantuserRoutingModule } from "./merchantuser-routing.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoadingSpinnerModule } from "../../../../../ui/loading-spinner/loading-spinner.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";

import { MerchantUserComponent } from "../merchant-user.component";
import { AddmerchantuserComponent } from "../addmerchantuser/addmerchantuser.component";
import { UpdatemerchantuserComponent } from "../updatemerchantuser/updatemerchantuser.component";
import { SearchmerchantuserComponent } from "../searchmerchantuser/searchmerchantuser.component";
import { LockedmerchantuserComponent } from "../lockedmerchantuser/lockedmerchantuser.component";

@NgModule({
  declarations: [
    MerchantUserComponent,
    AddmerchantuserComponent,
    UpdatemerchantuserComponent,
    SearchmerchantuserComponent,
    LockedmerchantuserComponent
  ],
  entryComponents: [AddmerchantuserComponent, UpdatemerchantuserComponent],
  imports: [
    CommonModule,
    MerchantuserRoutingModule,
    LoadingSpinnerModule,
    DataTablesModule,
    MatCheckboxModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    TransactionfeeModule
  ],
  exports: [SearchmerchantuserComponent]
})
export class MerchantuserModule {}
