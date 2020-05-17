import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user.component";

const userroutes: Routes = [
  {
    path: "",
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(userroutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
