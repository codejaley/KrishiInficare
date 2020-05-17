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
import { User, sno } from "./services/user.model";
import { UserService } from "./services/user.service";
import { CreateuserComponent } from "./createuser/createuser.component";
import { ToastrService } from "ngx-toastr";

import { EdituserComponent } from "./edituser/edituser.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  title = "Users";

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  showSpinner: boolean = true;

  tableData: User;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  response: any;
  status: string;
  constructor(
    private dataService: UserService,
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

        $("td #privi", row).unbind("click");
        $("td #privi", row).bind("click", () => {
          self.menuPrivilege(data);
          return row;
        });

        $("td #lock", row).unbind("click");
        $("td #lock", row).bind("click", () => {
          self.lockUser(data);
          return row;
        });
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
      }
    };
    this.getDataFromSource();
  }

  getDataFromSource() {
    this.dataService.getUsers().subscribe(data => {
      this.showSpinner = false;

      this.tableData = data;
      console.log(this.tableData);
      this.chRef.detectChanges();

      this.dtTrigger.next();
    });
  }

  openDialog() {
    const modalRef = this.dialog.open(CreateuserComponent);

    this.status = modalRef.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.dataService.getUsers().subscribe(data => {
          this.showSpinner = false;

          this.tableData = data;
          this.rerender();
        });
      }
    });
  }

  editDialog(data: any) {
    const modalRef = this.dialog.open(EdituserComponent);

    modalRef.componentInstance.updatedata = data[1];

    this.status = modalRef.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.dataService.getUsers().subscribe(data => {
          this.showSpinner = false;

          this.tableData = data;
          this.rerender();
        });
      }
    });
  }

  deleteDialog(data): void {
    var data1 = new sno();
    data1.userLoginId = data[1];
    this.deleteItem(data1);
  }

  deleteItem(data: sno) {
    if (confirm("Are you sure?")) {
      console.log(data);
      this.dataService
        .deleteUser(data)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (this.response["Status Code"] == 4004) {
              this.toastr.info(this.response["message"]);
            } else {
              this.dataService.getUsers().subscribe(data => {
                this.showSpinner = false;

                this.tableData = data;
                this.rerender();
                this.toastr.warning(this.response["message"]);
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

  lockUser(data: any) {
    var data1 = new sno();
    data1.userLoginId = data[1];
    this.lockItem(data1);
  }

  lockItem(model: sno) {
    if (confirm("Are you sure?")) {
      this.dataService
        .lockUser(model)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (
              this.response["Status Code"] == 1000 ||
              this.response["Status"] == "Failure"
            ) {
              this.toastr.info(this.response["Message"]);
            } else {
              this.dataService.getUsers().subscribe(data => {
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

  menuPrivilege(data: any) {
    var id = data[1];

    this.router.navigate(["dashboard/getUserMenuPrivilege", id]);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
