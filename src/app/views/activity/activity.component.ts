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
import { Activity } from "./services/activity.model";
import { ActivityService } from "./services/activity.service";
import { AddActivityComponent } from "./add-activity/add-activity.component";
import { ToastrService } from "ngx-toastr";
import { SourceNode } from "source-list-map";

import { EditActivityComponent } from "./edit-activity/edit-activity.component";
import { Router } from "@angular/router";

declare var $;

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.css"]
})
export class ActivityComponent implements OnInit {
  title = "Activity";

  //@ViewChild("dataTable") table: any;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  showSpinner: boolean = true;

  dataTable: any;
  dtOptions: DataTables.Settings = {};
  tableData;

  dtTrigger: Subject<any> = new Subject();

  response: any[];

  status: string;

  constructor(
    private dataService: ActivityService,
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
      searching: true,
      paging: false,
      ordering: false,
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
      }
    };
    this.getDataFromSource1();
  }

  getDataFromSource1() {
    this.dataService.getActivitytypeList().subscribe(data => {
      this.showSpinner = false;
      console.log(this.tableData);
      this.tableData = data;
      this.chRef.detectChanges();

      this.dtTrigger.next();
    });
  }

  deleteDialog(data) {
    if (confirm("Are You Sure")) {
    }
    return false;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
