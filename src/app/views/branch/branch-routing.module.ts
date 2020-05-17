import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BranchComponent } from "./branch.component";

const branchroutes: Routes = [
  {
    path: "",
    component: BranchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(branchroutes)],
  exports: [RouterModule]
})
export class BranchRoutingModule {}
