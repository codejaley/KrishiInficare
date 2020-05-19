import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OutletComponent } from "../outlet.component";

const routes: Routes = [
  {
    path: "",
    component: OutletComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutletRoutingModule {}
