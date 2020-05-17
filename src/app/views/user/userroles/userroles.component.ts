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

import { UserService } from "./../services/user.service";

import { ToastrService } from "ngx-toastr";

import { Router } from "@angular/router";

@Component({
  selector: "app-userroles",
  templateUrl: "./userroles.component.html",
  styleUrls: ["./userroles.component.css"]
})
export class UserrolesComponent implements OnInit {
  title = "UserRoles";

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  showSpinner: boolean = true;

  tableData: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  response: any;
  status: string;
  constructor(
    private dataService: UserService,
    public dialog: NgbModal,
    private toastr: ToastrService,

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
      ordering: false,

      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)

        $("td #privi", row).unbind("click");
        $("td #privi", row).bind("click", () => {
          self.rolePrivilege(data);
          return row;
        });

        $("td #del", row).unbind("click");
        $("td #del", row).bind("click", () => {
          self.deleteRole(data);
          return row;
        });
      }
    };
    this.getDataFromSource();
  }

  getDataFromSource() {
    this.dataService.getUserRoles().subscribe(data => {
      this.showSpinner = false;

      this.tableData = data;
      console.log(this.tableData);
      this.chRef.detectChanges();

      this.dtTrigger.next();
    });
  }

  rolePrivilege(data) {}
  deleteRole(data) {}

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
