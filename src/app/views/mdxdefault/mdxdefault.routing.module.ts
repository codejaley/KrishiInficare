import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MDXDefaultComponent } from "./mdxdefault.component";

const mdxdefaultroutes: Routes = [{ path: "", component: MDXDefaultComponent }];

@NgModule({
  imports: [RouterModule.forChild(mdxdefaultroutes)],
  exports: [RouterModule]
})
export class MDXDefaultRoutingModule {}
