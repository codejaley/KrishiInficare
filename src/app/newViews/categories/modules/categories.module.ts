import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./../categories.component";

import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerModule } from "src/app/ui/loading-spinner/loading-spinner.module";
import { QRCodeModule } from "angularx-qrcode";

import { MatCheckboxModule } from "@angular/material/checkbox";

import { MatProgressSpinnerModule } from "@angular/material";
import { AddcategoriesComponent } from "../addcategories/addcategories.component";
import { UpdatecategoriesComponent } from "../updatecategories/updatecategories.component";

@NgModule({
  declarations: [
    CategoriesComponent,
    AddcategoriesComponent,
    UpdatecategoriesComponent
  ],
  entryComponents: [AddcategoriesComponent, UpdatecategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,

    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerModule,
    MatCheckboxModule,
    QRCodeModule,
    MatProgressSpinnerModule
  ]
})
export class CategoriesModule {}
