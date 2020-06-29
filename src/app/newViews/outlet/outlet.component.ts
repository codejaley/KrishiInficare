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

import { OutletService } from "./service/outlet.service";
import { Outlet, id } from "./service/outlet.model";
import { ToastrService } from "ngx-toastr";

import { Router, ActivatedRoute } from "@angular/router";
import { AddoutletComponent } from "./addoutlet/addoutlet.component";
import { UpdateoutletComponent } from "./updateoutlet/updateoutlet.component";
import { Location } from "@angular/common";
@Component({
  selector: "app-outlet",
  templateUrl: "./outlet.component.html",
  styleUrls: ["./outlet.component.css"]
})
export class OutletComponent implements OnInit {
  title = "Outlet";

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
    private dataService: OutletService,
    public dialog: NgbModal,
    private toastr: ToastrService,
    private zone: NgZone,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private dataRoute: ActivatedRoute,
    private _location: Location
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
    this.vendor_id = this.dataRoute.snapshot.paramMap.get("id");
    this.dtOptions = {
      pagingType: "full_numbers",
      ordering: false,
      pageLength: 10,
      lengthChange: false,
      stateSave: true,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)

        $("td #lock", row).unbind("click");
        $("td #lock", row).bind("click", () => {
          self.lockOutlet(data);
          return row;
        });

        $("td #del", row).unbind("click");
        $("td #del", row).bind("click", () => {
          self.deleteOutlet(data);
          return row;
        });

        $("td #edit", row).unbind("click");
        $("td #edit", row).bind("click", () => {
          self.editOutlet(data);
          return row;
        });

        $("td #outlet", row).unbind("click");
        $("td #outlet", row).bind("click", () => {
          self.navigateOutletuser(data);
          return row;
        });
      }
    };
    this.getOutletList(this.vendor_id);
  }
  backClicked() {
    this._location.back();
  }

  getOutletList(id) {
    this.dataService.getOutletList(id).subscribe(data => {
      this.showSpinner = false;

      this.tableData = data;

      this.chRef.detectChanges();

      this.dtTrigger.next();
    });
  }
  addOutlet() {
    const modalRef = this.dialog.open(AddoutletComponent, {
      size: "lg"
    });
    modalRef.componentInstance.vendorid = this.vendor_id;
    this.status = modalRef.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.dataService.getOutletList(this.vendor_id).subscribe(data => {
          this.showSpinner = false;

          this.tableData = data;
          this.rerender();
        });
      }
    });
  }
  deleteOutlet(data) {
    console.log(data);
    var data1 = new id();
    data1.id = data[0];
    this.deleteItem(data1);
  }

  deleteItem(id: id) {
    if (confirm("Are you sure?")) {
      this.toastr.info("Please Wait", "", {
        timeOut: 1000
      });
      this.dataService
        .deleteOutlet(id)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (this.response["Status"] !== "Success") {
              this.toastr.info(this.response["message"]);
            } else {
              this.dataService.getOutletList(this.vendor_id).subscribe(data => {
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

  editOutlet(data) {
    this.toastr.info("Please Wait", "", {
      timeOut: 2000
    });
    const modal = this.dialog.open(UpdateoutletComponent, { size: "lg" });
    modal.componentInstance.vendorid = this.vendor_id;
    modal.componentInstance.outletid = data[0];

    this.status = modal.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.dataService.getOutletList(this.vendor_id).subscribe(data => {
          this.showSpinner = false;

          this.tableData = data;
          this.rerender();
        });
      }
    });
  }

  lockOutlet(data) {
    var data1 = new id();
    data1.id = data[0];
    if (confirm("Are you sure?")) {
      this.dataService
        .lockOutlet(data1)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (this.response["Status"] !== "Success") {
              this.toastr.info(this.response["message"]);
            } else {
              this.dataService.getOutletList(this.vendor_id).subscribe(data => {
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

  navigateOutletuser(data) {
    var id = this.vendor_id;
    var uid = data[0];
    this.router.navigate(["dashboard/vendor", id, uid]);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
