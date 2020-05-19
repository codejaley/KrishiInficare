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

import { ToastrService } from "ngx-toastr";

import { Router, ActivatedRoute } from "@angular/router";

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
    private dataRoute: ActivatedRoute
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
      stateSave: true,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)

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

        $("td #outlet", row).unbind("click");
        $("td #outlet", row).bind("click", () => {
          self.navigateOutlet(data);
          return row;
        });
      }
    };
    this.getDataFromSource1(this.vendor_id);
  }

  getDataFromSource1(id) {
    this.dataService.getOutletList(id).subscribe(data => {
      this.showSpinner = false;

      this.tableData = data;
      console.log(this.tableData);
      this.chRef.detectChanges();

      this.dtTrigger.next();
    });
  }

  deleteCustomer(data) {}

  deleteItem() {}

  editCustomer(data) {
    console.log(data, "edit");
  }

  navigateOutlet(data) {
    var id = data[0];
    this.router.navigate(["dashboard/vendor", id]);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
