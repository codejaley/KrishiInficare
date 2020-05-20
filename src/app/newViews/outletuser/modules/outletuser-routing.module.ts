import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OutletuserComponent } from "../outletuser.component";

const routes: Routes = [
  {
    path: "",
    component: OutletuserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutletuserRoutingModule {}
