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
import { sno, Company } from "./services/company.model";
import { CompanyService } from "./services/company.service";
import { AddCompanyComponent } from "./add-company/add-company.component";
import { ToastrService } from "ngx-toastr";
import { SourceNode } from "source-list-map";
import { ViewcompanyComponent } from "./viewcompany/viewcompany.component";
import { UpdatecompanyComponent } from "./updatecompany/updatecompany.component";
import { Router } from "@angular/router";

declare var $;
@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.css"]
})
export class CompanyComponent implements OnInit {
  title = "Company";

  //@ViewChild("dataTable") table: any;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  showSpinner: boolean = true;

  dataTable: any;
  dtOptions: DataTables.Settings = {};
  tableData: Company;

  dtTrigger: Subject<any> = new Subject();

  response: any[];

  status: string;

  constructor(
    private dataService: CompanyService,
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
      pageLength: 10,
      stateSave: true,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $("td .btn.btn-info.remove", row).unbind("click");
        $("td .btn.btn-info.remove", row).bind("click", () => {
          self.deleteDialog(data);
          return row;
        });

        $("td .btn.btn-info.edit", row).unbind("click");
        $("td .btn.btn-info.edit", row).bind("click", () => {
          self.editDialog(data);
          return row;
        });

        $("td .btn.btn-info.view", row).unbind("click");
        $("td .btn.btn-info.view", row).bind("click", () => {
          self.viewDialog(data);
          return row;
        });

        $("td .btn.btn-info.detail", row).unbind("click");
        $("td .btn.btn-info.detail", row).bind("click", () => {
          self.getBranch(data);
          return row;
        });
        $("td #lock", row).unbind("click");
        $("td #lock", row).bind("click", () => {
          self.lockCompany(data);
          return row;
        });
      }
    };
    this.getDataFromSource1();
  }

  getDataFromSource1() {
    this.dataService.getCompanyList().subscribe(data => {
      this.showSpinner = false;

      this.tableData = data;
      this.chRef.detectChanges();

      this.dtTrigger.next();
    });
  }

  openDialog() {
    const modalRef = this.dialog.open(AddCompanyComponent);

    this.status = modalRef.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.dataService.getCompanyList().subscribe(data => {
          this.showSpinner = false;

          this.tableData = data;
          this.rerender();
        });
      }
    });
  }

  viewDialog(data) {
    const modalRef2 = this.dialog.open(ViewcompanyComponent);
    modalRef2.componentInstance.viewdata = data;
  }

  editDialog(data) {
    const modalRef3 = this.dialog.open(UpdatecompanyComponent);
    modalRef3.componentInstance.updatedata = data;

    this.status = modalRef3.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.dataService.getCompanyList().subscribe(data => {
          this.showSpinner = false;

          this.tableData = data;
          this.rerender();
        });
      }
    });
  }

  deleteDialog(data): void {
    var data1 = new sno();
    data1.value = data[0];
    this.deleteItem(data1);
  }

  deleteItem(data: sno) {
    if (confirm("Are you sure?")) {
      console.log(data);
      this.dataService
        .deleteCompany(data)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (this.response["Status Code"] == 101) {
              this.toastr.info(this.response["Message"]);
            } else {
              this.dataService.getCompanyList().subscribe(data => {
                this.showSpinner = false;

                this.tableData = data;
                this.rerender();
                this.toastr.warning(this.response["Message"]);
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
  lockCompany(data: any) {
    var data1 = new sno();
    data1.value = data[0];
    this.lockItem(data1);
  }

  lockItem(model: sno) {
    if (confirm("Are you sure?")) {
      this.dataService
        .lockCompany(model)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (this.response["Status Code"] == 1000) {
              this.toastr.info(this.response["Message"]);
            } else {
              this.dataService.getCompanyList().subscribe(data => {
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

  getBranch(data) {
    var id = data[0];

    this.router.navigate(["/dashboard/merchant", id]);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
