import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./user-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerModule } from "src/app/ui/loading-spinner/loading-spinner.module";
import { ChangepasswordComponent } from "./changepassword/changepassword.component";
import { DataTablesModule } from "angular-datatables";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { CreateuserComponent } from "./createuser/createuser.component";
import { EdituserComponent } from "./edituser/edituser.component";
import { UserComponent } from "./user.component";
import { UsermenuComponent } from "./usermenu/usermenu.component";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [
    ChangepasswordComponent,
    CreateuserComponent,
    EdituserComponent,
    UserComponent,
    UsermenuComponent
  ],
  entryComponents: [CreateuserComponent, EdituserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    UserRoutingModule,
    DataTablesModule,
    MatCheckboxModule
  ]
})
export class UserModule {}
