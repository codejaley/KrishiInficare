import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { DefaultviewComponent } from "./defaultview/defaultview.component";

import { Page1Component } from "./../views/page1/page1.component";
import { Page2Component } from "./../views/page2/page2.component";
import { ActivityComponent } from "./../views/activity/activity.component";
import { CompanyComponent } from "./../views/company/company.component";
import { BranchComponent } from "./../views/branch/branch.component";

import { PagenotfoundComponent } from "../views/pagenotfound/pagenotfound.component";
import { MDXDefaultComponent } from "../views/mdxdefault/mdxdefault.component";
import { MerchantComponent } from "../views/company/merchant/merchant.component";
import { MerchantUserComponent } from "../views/company/merchant/merchant-user/merchant-user.component";
import { SearchmerchantuserComponent } from "../views/company/merchant/merchant-user/searchmerchantuser/searchmerchantuser.component";
import { LockedmerchantuserComponent } from "../views/company/merchant/merchant-user/lockedmerchantuser/lockedmerchantuser.component";
import { ChangepasswordComponent } from "./../views/user/changepassword/changepassword.component";
import { EdituserComponent } from "../views/user/edituser/edituser.component";
import { CreateuserComponent } from "../views/user/createuser/createuser.component";
import { UserComponent } from "../views/user/user.component";
import { UsermenuComponent } from "../views/user/usermenu/usermenu.component";
import { UserrolesComponent } from "../views/user/userroles/userroles.component";
import { CustomerComponent } from "../newViews/customer/customer.component";
import { VendorComponent } from "../newViews/vendor/vendor.component";
import { OutletComponent } from "../newViews/outlet/outlet.component";

const dashboardroutes: Routes = [
  {
    path: "",

    component: DashboardComponent,
    children: [
      {
        path: "",

        children: [
          { path: "page1", component: Page1Component },
          { path: "page2", component: Page2Component },
          { path: "", component: DefaultviewComponent },
          { path: "customer", component: CustomerComponent },
          { path: "vendor", component: VendorComponent },
          { path: "vendor/:id", component: OutletComponent },

          { path: "activity", component: ActivityComponent },
          { path: "company", component: CompanyComponent },
          { path: "branch", component: BranchComponent },
          { path: "mdxDefault", component: MDXDefaultComponent },
          { path: "merchant/:id", component: MerchantComponent },
          { path: "merchantUser/:pid/:id", component: MerchantUserComponent },
          { path: "searchMerchant", component: SearchmerchantuserComponent },
          { path: "getLockedMerchant", component: LockedmerchantuserComponent },
          { path: "getUsers", component: UserComponent },

          { path: "changePassword", component: ChangepasswordComponent },
          { path: "getUserMenuPrivilege/:id", component: UsermenuComponent },
          { path: "getUserRoles", component: UserrolesComponent }

          //{ path: "**", pathMatch: "full", redirectTo: "/dashboard" }
        ]
      }
    ]
  },
  { path: "**", pathMatch: "full", redirectTo: "/dashboard" }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardroutes)],
  exports: [RouterModule],
  declarations: []
})
export class DashboardRoutingModule {}
