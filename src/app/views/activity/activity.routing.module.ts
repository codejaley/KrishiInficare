import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityComponent } from "./activity.component";

const activityroutes: Routes = [
  {
    path: "",
    component: ActivityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(activityroutes)],
  exports: [RouterModule],
  declarations: []
})
export class ActivityRoutingModule {}
