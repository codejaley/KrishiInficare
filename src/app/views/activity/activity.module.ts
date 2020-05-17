import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerModule } from "src/app/ui/loading-spinner/loading-spinner.module";

import { DataTablesModule } from "angular-datatables";
import { ActivityRoutingModule } from "./activity.routing.module";

import { ActivityComponent } from "./activity.component";

import { AddActivityComponent } from "./add-activity/add-activity.component";
import { EditActivityComponent } from "./edit-activity/edit-activity.component";

@NgModule({
  declarations: [
    ActivityComponent,
    //LoadingSpinnerComponent,
    AddActivityComponent,
    EditActivityComponent
  ],
  entryComponents: [AddActivityComponent, EditActivityComponent],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerModule,
    DataTablesModule
  ]
})
export class ActivityModule {}
