import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefaultviewComponent } from "./defaultview.component";
import { MerchantuserModule } from "./../../views/company/merchant/merchant-user/merchantuser/merchantuser.module";

@NgModule({
  declarations: [DefaultviewComponent],
  imports: [CommonModule, MerchantuserModule],
  exports: []
})
export class DefaultviewModule {}
