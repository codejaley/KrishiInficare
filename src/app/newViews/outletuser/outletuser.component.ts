import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  NgZone,
  ChangeDetectorRef,
  ViewChildren,
  Output
} from "@angular/core";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { OutletUserService } from "./service/outletuser.service";
import { id } from "./service/outletuser.model";
import { ToastrService } from "ngx-toastr";

import { Router, ActivatedRoute } from "@angular/router";
import { AddoutletuserComponent } from "./addoutletuser/addoutletuser.component";

@Component({
  selector: "app-outletuser",
  templateUrl: "./outletuser.component.html",
  styleUrls: ["./outletuser.component.css"]
})
export class OutletuserComponent implements OnInit {
  ouletuser_id: any;

  title = "OutletUser";

  //@ViewChild("dataTable") table: any;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  vendor_id: any;
  showSpinner: boolean = true;

  dtOptions: DataTables.Settings = {};
  tableData: any;

  dtTrigger: Subject<any> = new Subject();

  response: any;

  status: string;

  constructor(
    private dataService: OutletUserService,
    public dialog: NgbModal,
    private toastr: ToastrService,
    private zone: NgZone,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private dataRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ouletuser_id = this.dataRoute.snapshot.paramMap.get("uid");
    this.dtOptions = {
      pagingType: "full_numbers",
      ordering: false,
      pageLength: 10,
      stateSave: true,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)

        $("td #del", row).unbind("click");
        $("td #del", row).bind("click", () => {
          self.deleteOutletUser(data);
          return row;
        });

        $("td #edit", row).unbind("click");
        $("td #edit", row).bind("click", () => {
          self.editOutletUser(data);
          return row;
        });
      }
    };
    this.getOutletUserList(this.ouletuser_id);
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getOutletUserList(id) {
    this.dataService.getOutletUserList(id).subscribe(data => {
      this.showSpinner = false;

      this.tableData = data;
      console.log(this.tableData);
      this.chRef.detectChanges();

      this.dtTrigger.next();
    });
  }

  addOutletUser() {
    const modalRef = this.dialog.open(AddoutletuserComponent);
    modalRef.componentInstance.outletid = this.ouletuser_id;

    this.status = modalRef.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.dataService
          .getOutletUserList(this.ouletuser_id)
          .subscribe(data => {
            this.showSpinner = false;

            this.tableData = data;
            this.rerender();
          });
      }
    });
  }

  deleteOutletUser(data) {
    console.log(data);
    var data1 = new id();
    data1.id = data[0];
    this.deleteItem(data1);
  }

  deleteItem(id) {
    if (confirm("Are you sure?")) {
      this.dataService
        .deleteOutletUser(id)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (this.response["Status"] !== "Success") {
              this.toastr.info(this.response["message"]);
            } else {
              this.dataService
                .getOutletUserList(this.ouletuser_id)
                .subscribe(data => {
                  this.showSpinner = false;

                  this.tableData = data;
                  this.rerender();
                  this.toastr.success(this.response["message"]);
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

  editOutletUser(data) {}

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
