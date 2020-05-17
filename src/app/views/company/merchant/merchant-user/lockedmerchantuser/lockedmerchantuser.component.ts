import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input
} from "@angular/core";

import { DataTableDirective } from "angular-datatables";
import { Subject, from } from "rxjs";

import { ToastrService } from "ngx-toastr";

import { Merchantuser, sno, dmu } from "../services/merchantuser.model";
import { MerchantuserService } from "../services/merchantuser.service";

@Component({
  selector: "app-lockedmerchantuser",
  templateUrl: "./lockedmerchantuser.component.html",
  styleUrls: ["./lockedmerchantuser.component.css"]
})
export class LockedmerchantuserComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  title = "Locked Merchant User";
  showSpinner: boolean = true;

  tableData: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  response: any[];
  status;
  private agentBranchCode;
  private agentUserId;
  count;

  constructor(
    private service: MerchantuserService,
    private chRef: ChangeDetectorRef,

    private toastr: ToastrService
  ) {}

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnInit(): void {
    this.agentBranchCode = 76;
    this.dtOptions = {
      paging: false,

      searching: false,

      ordering: false,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)

        $("td #lock", row).unbind("click");
        $("td #lock", row).bind("click", () => {
          self.toggle(data);
          return row;
        });
      }
    };

    this.getLockedMusers();
  }

  getLockedMusers() {
    this.service.getLockedMerchantUser().subscribe(data => {
      this.showSpinner = false;
      this.tableData = data;
      this.count = Object.keys(data).length;
      console.log(this.tableData);
      this.chRef.detectChanges();

      this.dtTrigger.next();
    });
  }

  toggle(data: any) {
    console.log(data);
    this.agentBranchCode = data[1];
    this.agentUserId = data[2];
    var model = new dmu();
    model.companyBranch = this.agentBranchCode;
    model.merchantId = this.agentUserId;
    this.lockMerchantUser(model);
  }
  lockMerchantUser(model: dmu) {
    if (confirm("Are you sure you want to lock?")) {
      this.service
        .lockMerchantUser(model)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (this.response["Status Code"] == 1000) {
              this.toastr.info(this.response["Message"]);
            } else {
              this.service.getLockedMerchantUser().subscribe(data => {
                this.showSpinner = false;

                this.tableData = data;
                this.count = Object.keys(data).length;
                this.rerender();
                this.toastr.warning(this.response["Message"]);
              });
            }
          },
          error => {
            console.log("ERROR LOcking");
          }
        );
    }
    return false;
  }
}
