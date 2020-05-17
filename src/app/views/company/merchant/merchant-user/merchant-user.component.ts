import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input
} from "@angular/core";

import { DataTableDirective } from "angular-datatables";
import { Subject, from } from "rxjs";

import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { ToastrService } from "ngx-toastr";

import { MatCheckboxChange } from "@angular/material/checkbox";
import { Merchantuser, sno, dmu } from "./services/merchantuser.model";
import { MerchantuserService } from "./services/merchantuser.service";
import { Router, ActivatedRoute } from "@angular/router";

import { AddmerchantuserComponent } from "./addmerchantuser/addmerchantuser.component";
import { UpdatemerchantuserComponent } from "./updatemerchantuser/updatemerchantuser.component";
declare var $;
@Component({
  selector: "app-merchant-user",
  templateUrl: "./merchant-user.component.html",
  styleUrls: ["./merchant-user.component.css"]
})
export class MerchantUserComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  title = "Merchant User";
  showSpinner: boolean = true;

  tableData: Merchantuser;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  response: any[];
  status;
  private agentCode;
  private agentBranchCode;
  private agentUserId;
  constructor(
    private service: MerchantuserService,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private dataRoute: ActivatedRoute,
    public dialog: NgbModal,
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
    this.agentBranchCode = this.dataRoute.snapshot.paramMap.get("id");
    this.agentCode = this.dataRoute.snapshot.paramMap.get("pid");
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      stateSave: true,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $("td #del", row).unbind("click");
        $("td #del", row).bind("click", () => {
          self.deleteDialog(data);
          return row;
        });

        $("td #edit", row).unbind("click");
        $("td #edit", row).bind("click", () => {
          self.editDialog(data);
          return row;
        });

        $("td #view", row).unbind("click");
        $("td #view", row).bind("click", () => {
          self.viewDialog(data);
          return row;
        });

        $("td #lock", row).unbind("click");
        $("td #lock", row).bind("click", () => {
          self.toggle(data);
          return row;
        });
      }
    };

    this.getDataFromSource(this.agentBranchCode);
  }

  getDataFromSource(agentBranchCode: string) {
    this.service.getMerchantUserList(agentBranchCode).subscribe(data => {
      this.showSpinner = false;
      this.tableData = data;
      this.chRef.detectChanges();

      this.dtTrigger.next();
    });
  }

  editDialog(data: any) {
    const modalref2 = this.dialog.open(UpdatemerchantuserComponent);
    modalref2.componentInstance.agentBranchCode = this.agentBranchCode;
    modalref2.componentInstance.agentCode = this.agentCode;
    modalref2.componentInstance.agentUserId = data[4];
    console.log(data[4]);

    this.status = modalref2.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.service
          .getMerchantUserList(this.agentBranchCode)
          .subscribe(data => {
            this.showSpinner = false;

            this.tableData = data;
            this.rerender();
          });
      }
    });
  }
  viewDialog(data: any) {
    alert("asdad");
  }
  deleteDialog(data: any) {
    var userId = new sno();
    userId.value = data[4];
    this.deleteMerchantUser(userId);
  }

  deleteMerchantUser(data: sno) {
    if (confirm("Are you sure?")) {
      this.service
        .deleteMerchantuser(data)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (this.response["Status Code"] == 1000) {
              this.toastr.info(this.response["Message"]);
            } else {
              this.service
                .getMerchantUserList(this.agentBranchCode)
                .subscribe(data => {
                  this.showSpinner = false;

                  this.tableData = data;
                  this.rerender();
                  this.toastr.warning(this.response["Message"]);
                });
            }
          },
          error => {
            console.log("ERROR DELETING");
          }
        );
    }
    return false;
  }

  addMerchantUser() {
    const modalRef = this.dialog.open(AddmerchantuserComponent);
    modalRef.componentInstance.agentBranchCode = this.agentBranchCode;
    modalRef.componentInstance.agentCode = this.agentCode;

    this.status = modalRef.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.service
          .getMerchantUserList(this.agentBranchCode)
          .subscribe(data => {
            this.showSpinner = false;

            this.tableData = data;
            this.rerender();
          });
      }
    });
  }

  toggle(data: any) {
    var model = new dmu();
    model.companyBranch = this.agentBranchCode;
    model.merchantId = data[4];
    console.log(model.merchantId);
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
              this.service
                .getMerchantUserList(this.agentBranchCode)
                .subscribe(data => {
                  this.showSpinner = false;

                  this.tableData = data;
                  this.rerender();
                  this.toastr.success(this.response["Message"]);
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
