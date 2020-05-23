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
import { Categories, id } from "./services/categories.model";
import { CategoriesService } from "./services/categories.service";

import { ToastrService } from "ngx-toastr";

import { Router } from "@angular/router";
import { AddcategoriesComponent } from "./addcategories/addcategories.component";
import { UpdatecategoriesComponent } from "./updatecategories/updatecategories.component";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
  title = "Category";

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  showSpinner: boolean = true;

  dataTable: any;
  dtOptions: DataTables.Settings = {};
  tableData: Categories;

  dtTrigger: Subject<any> = new Subject();

  response: any;

  status: string;

  constructor(
    private dataService: CategoriesService,
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
      lengthChange: false,
      stateSave: true,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)

        $("td #del", row).unbind("click");
        $("td #del", row).bind("click", () => {
          self.deleteCategory(data);
          return row;
        });

        $("td #edit", row).unbind("click");
        $("td #edit", row).bind("click", () => {
          self.editCategory(data);
          return row;
        });
      }
    };
    this.getDataFromSource1();
  }

  getDataFromSource1() {
    this.dataService.getCategorieslist().subscribe(data => {
      this.showSpinner = false;

      this.tableData = data;

      this.chRef.detectChanges();

      this.dtTrigger.next();
    });
  }

  addCategory() {
    const modalRef = this.dialog.open(AddcategoriesComponent);

    this.status = modalRef.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.dataService.getCategorieslist().subscribe(data => {
          this.showSpinner = false;

          this.tableData = data;
          this.rerender();
        });
      }
    });
  }

  deleteCategory(data) {
    var data1 = new id();
    data1.id = data[0];
    this.deleteItem(data1);
  }

  deleteItem(id: id) {
    if (confirm("Are you sure?")) {
      this.dataService
        .deleteCategory(id)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (this.response["Status"] !== "Success") {
              this.toastr.info(this.response["message"]);
            } else {
              this.dataService.getCategorieslist().subscribe(data => {
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

  editCategory(data) {
    const modaRef = this.dialog.open(UpdatecategoriesComponent);
    modaRef.componentInstance.catID = data[0];

    this.status = modaRef.componentInstance.event.subscribe(res => {
      this.status = res.data;
      if (this.status == "Success") {
        this.dataService.getCategorieslist().subscribe(data => {
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
