import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input
} from "@angular/core";

import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { Merchant, sno } from "./services/merchant.model";
import { MerchantService } from "./services/merchant.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AddmerchantComponent } from "./addmerchant/addmerchant.component";
import { UpdatedmerchantComponent } from "./updatedmerchant/updatedmerchant.component";

declare var $;
@Component({
  selector: "app-merchant",
  templateUrl: "./merchant.component.html",
  styleUrls: ["./merchant.component.css"]
})
export class MerchantComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  title = "Merchant";
  showSpinner: boolean = true;

  tableData: Merchant;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  response: any[];
  status;
  private agentCode;
  private agentBranchCode;
  public user = {
    name: "Izzat Nadiri",
    age: 26
  };
  private dataid;
  constructor(
    private service: MerchantService,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private dataRoute: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: NgbModal
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
    this.agentCode = this.dataRoute.snapshot.paramMap.get("id");
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

        $("td #user", row).unbind("click");
        $("td #user", row).bind("click", () => {
          self.getMerchantUser(data);
          return row;
        });

        $("td #lock", row).unbind("click");
        $("td #lock", row).bind("click", () => {
          self.lockMerchant(data);
          return row;
        });
      }
    };

    this.getDataFromSource(this.agentCode);
  }

  getDataFromSource(agentCode: string) {
    this.service.getMerchantList(agentCode).subscribe(data => {
      this.showSpinner = false;
      this.tableData = data;
      this.chRef.detectChanges();

      this.dtTrigger.next();
    });
  }

  addMerchant() {
    const addmerchant = this.dialog.open(AddmerchantComponent);
    addmerchant.componentInstance.agentCode = this.agentCode;

    this.status = addmerchant.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.service.getMerchantList(this.agentCode).subscribe(data => {
          this.showSpinner = false;

          this.tableData = data;
          this.rerender();
        });
      }
    });
  }

  editDialog(data: any) {
    const modalref = this.dialog.open(UpdatedmerchantComponent);
    modalref.componentInstance.agentCode = data[0];
    modalref.componentInstance.agentBranchCode = data[1];

    this.status = modalref.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.service.getMerchantList(this.agentCode).subscribe(data => {
          this.showSpinner = false;

          this.tableData = data;
          this.rerender();
        });
      }
    });
  }
  viewDialog(data: any) {
    console.log((this.agentCode = data[0]));
  }
  deleteDialog(data: any) {
    var data1 = new sno();
    data1.value = data[1];
    this.deleteMerchant(data1);
  }

  deleteMerchant(data: sno) {
    if (confirm("Are you sure?")) {
      this.service
        .deleteMerchant(data)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (this.response["Status Code"] == 101) {
              this.toastr.info(this.response["Message"]);
            } else {
              this.service.getMerchantList(this.agentCode).subscribe(data => {
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

  getMerchantUser(data) {
    var Pid = data[0];
    var id = data[1];

    this.router.navigate(["/dashboard/merchantUser", Pid, id]);
  }

  lockMerchant(data: any) {
    var data1 = new sno();
    data1.value = data[1];
    console.log(data1.value);
    this.lockItemM(data1);
  }

  lockItemM(model: sno) {
    if (confirm("Are you sure?")) {
      this.service
        .lockMerchant(model)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (this.response["Status Code"] == 1000) {
              this.toastr.info(this.response["Message"]);
            } else {
              this.service.getMerchantList(this.agentCode).subscribe(data => {
                this.showSpinner = false;

                this.tableData = data;
                this.toastr.success(this.response["Message"]);
                this.rerender();
              });
            }
          },
          error => {
            this.toastr.warning(error.error.Message);
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
