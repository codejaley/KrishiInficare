import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MDXDefaultRoutingModule } from "./mdxdefault.routing.module";

import { MDXDefaultComponent } from "./mdxdefault.component";

import { LoadingSpinnerModule } from "src/app/ui/loading-spinner/loading-spinner.module";

@NgModule({
  declarations: [MDXDefaultComponent],
  imports: [
    CommonModule,
    MDXDefaultRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerModule
  ]
})
export class MDXDefaultModule {}
