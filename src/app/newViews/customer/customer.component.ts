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
import { Customer, id } from "./services/customer.model";
import { CustomerService } from "./services/customer.service";
import { AddcustomerComponent } from "./addcustomer/addcustomer.component";
import { ToastrService } from "ngx-toastr";

import { UpdatecustomerComponent } from "./updatecustomer/updatecustomer.component";
import { Router } from "@angular/router";
import { QrcodeComponent } from "./qrcode/qrcode.component";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  title = "Customer";

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  showSpinner: boolean = true;

  dataTable: any;
  dtOptions: DataTables.Settings = {};
  tableData: Customer;

  dtTrigger: Subject<any> = new Subject();

  response: any;

  status: string;

  constructor(
    private dataService: CustomerService,
    public dialog: NgbModal,
    private toastr: ToastrService,
    private zone: NgZone,
    private chRef: ChangeDetectorRef,
    private router: Router
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
    this.dtOptions = {
      pagingType: "full_numbers",
      ordering: false,
      pageLength: 10,
      stateSave: true,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)

        $("td #qrcode", row).unbind("click");
        $("td #qrcode", row).bind("click", () => {
          self.generateQr(data);
          return row;
        });

        $("td #del", row).unbind("click");
        $("td #del", row).bind("click", () => {
          self.deleteCustomer(data);
          return row;
        });

        $("td #edit", row).unbind("click");
        $("td #edit", row).bind("click", () => {
          self.editCustomer(data);
          return row;
        });
      }
    };
    this.getDataFromSource1();
  }

  getDataFromSource1() {
    this.dataService.getCustomerlist().subscribe(data => {
      this.showSpinner = false;

      this.tableData = data;
      console.log(this.tableData);
      this.chRef.detectChanges();

      this.dtTrigger.next();
    });
  }

  addCustomer() {
    const modalRef = this.dialog.open(AddcustomerComponent);

    this.status = modalRef.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.dataService.getCustomerlist().subscribe(data => {
          this.showSpinner = false;

          this.tableData = data;
          this.rerender();
        });
      }
    });
  }

  generateQr(data) {
    console.log(data);
    const modalRef = this.dialog.open(QrcodeComponent, { size: "sm" });

    modalRef.componentInstance.myAngularxQrCode =
      data[2] + "," + data[4] + "," + data[6] + "," + data[12];
  }

  deleteCustomer(data) {
    var data1 = new id();
    data1.id = data[0];
    this.deleteItem(data1);
  }

  deleteItem(id: id) {
    if (confirm("Are you sure?")) {
      this.dataService
        .deleteCustomer(id)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (this.response["Status"] !== "Success") {
              this.toastr.info(this.response["message"]);
            } else {
              this.dataService.getCustomerlist().subscribe(data => {
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

  editCustomer(data) {
    const modal = this.dialog.open(UpdatecustomerComponent);
    modal.componentInstance.vendorid = data[0];

    this.status = modal.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.dataService.getCustomerlist().subscribe(data => {
          this.showSpinner = false;

          this.tableData = data;
          this.rerender();
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
