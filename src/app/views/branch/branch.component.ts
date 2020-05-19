import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Branch } from "./services/branch.model";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { BranchService } from "./services/branch.service";

@Component({
  selector: "app-branch",
  templateUrl: "./branch.component.html",
  styleUrls: ["./branch.component.css"]
})
export class BranchComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  title = "Branch";
  showSpinner: boolean = true;

  tableData: Branch;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  response: any[];

  constructor(
    private dataService: BranchService,
    private chRef: ChangeDetectorRef
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
      }
    };
    this.getDataFromSource();
  }

  getDataFromSource() {
    this.dataService.getBranchList().subscribe(data => {
      this.showSpinner = false;
      this.tableData = data;
      this.chRef.detectChanges();

      this.dtTrigger.next();
    });
  }

  editDialog(data: any) {
    alert("asdad");
  }
  viewDialog(data: any) {
    alert("asdad");
  }
  deleteDialog(data: any) {
    alert("asdad");
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  trackByMethod(index: number, el: any): number {
    return el.id;
  }
}
