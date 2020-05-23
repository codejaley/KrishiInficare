import {
  Component,
  OnInit,
  ViewChild,
  NgZone,
  ChangeDetectorRef
} from "@angular/core";
import { Subject } from "rxjs";
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";

import { IDropdownSettings } from "ng-multiselect-dropdown";
import { TransactionService } from "./services/transaction.service";
import { Transaction } from "./services/transaction.model";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-transaction-reports",
  templateUrl: "./transaction-reports.component.html",
  styleUrls: ["./transaction-reports.component.css"]
})
export class TransactionReportsComponent implements OnInit {
  title = "Report";

  report: Transaction[] = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      ordering: false,
      pageLength: 10
    };
    this.getdata();
  }
  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private chRef: ChangeDetectorRef,
    private service: TransactionService,
    private toastr: ToastrService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getdata() {
    this.report = null;
    this.chRef.detectChanges();

    this.dtTrigger.next();
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  getReport() {
    this.toastr.info("Generating Report..", "", {
      timeOut: 10000
    });
    this.service.gettransaction().subscribe(
      data => {
        this.toastr.clear();
        this.report = data["transactions"];

        this.rerender();
      },
      error => {
        console.log(error);
        this.toastr.warning(error.name, error.message);
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
