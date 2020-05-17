import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

//custom modeuls layout includes header,sidebar,footer
import { SharedModule } from "../shared/shared.module";

//activity module
import { ActivityModule } from "../views/activity/activity.module";

//company module
import { CompanyModule } from "../views/company/company.module";

//branch module
import { BranchModule } from "../views/branch/branch.module";

//
import { MDXDefaultModule } from "../views/mdxdefault/mdxdefault.module";
//
import { MerchantModule } from "../views/company/merchant/merchant.module";

//
import { MerchantuserModule } from "../views/company/merchant/merchant-user/merchantuser/merchantuser.module";
//rouitng modules for dashboard and activity
import { UserModule } from "./../views/user/user.module";
import { DashboardRoutingModule } from "../dashboard/dashboard.routing.module";

//components
import { DashboardComponent } from "./dashboard.component";

import { Page1Component } from "../views/page1/page1.component";
import { Page2Component } from "../views/page2/page2.component";
import { DefaultviewModule } from "./defaultview/defaultview.module";

//loading spinner

@NgModule({
  declarations: [DashboardComponent, Page1Component, Page2Component],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ActivityModule,
    CompanyModule,
    BranchModule,
    MDXDefaultModule,
    MerchantModule,
    MerchantuserModule,
    UserModule,
    DefaultviewModule
  ],
  exports: []
})
export class DashboardModule {}
