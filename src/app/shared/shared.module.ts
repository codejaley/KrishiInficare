import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { HeaderTopComponent } from "../shared/header-top/header-top.component";

import { NavComponent } from "../shared/nav/nav.component";

import { FooterComponent } from "../shared/footer/footer.component";

@NgModule({
  declarations: [NavComponent, HeaderTopComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavComponent, HeaderTopComponent, FooterComponent]
})
export class SharedModule {}
