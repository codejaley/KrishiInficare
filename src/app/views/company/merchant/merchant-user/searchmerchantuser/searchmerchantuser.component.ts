import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input,
  ElementRef,
  NgZone
} from "@angular/core";
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import {
  Observable,
  Subject,
  from,
  empty,
  Subscription,
  fromEvent
} from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  mergeAll,
  switchMap
} from "rxjs/operators";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { ToastrService } from "ngx-toastr";

import { MatCheckboxChange } from "@angular/material/checkbox";
import { Merchantuser, sno, dmu } from "../services/merchantuser.model";
import { MerchantuserService } from "../services/merchantuser.service";

import { UpdatemerchantuserComponent } from "../updatemerchantuser/updatemerchantuser.component";
declare var $;
@Component({
  selector: "app-searchmerchantuser",
  templateUrl: "./searchmerchantuser.component.html",
  styleUrls: ["./searchmerchantuser.component.css"]
})
export class SearchmerchantuserComponent implements OnInit {
  @ViewChild("myfilter")
  filter: ElementRef;
  keyupsubscription: Subscription;
  keydownsubscription: Subscription;
  datatableElement: DataTableDirective;

  isDtInitialized: boolean = false;

  title = "Search Merchant User";
  showSpinner: boolean = false;

  tableData: Merchantuser;
  dtOptions: DataTables.Settings;
  dtTrigger: Subject<any> = new Subject();
  response: any[];
  status;

  public model: any;

  constructor(
    private service: MerchantuserService,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private zone: NgZone,
    public dialog: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.keyupsubscription = fromEvent(this.filter.nativeElement, "keyup")
      .pipe(
        debounceTime(1000),
        map((event: Event) => (<HTMLInputElement>event.target).value),
        distinctUntilChanged(),

        tap(() => (this.showSpinner = true)),

        switchMap(value =>
          value.length < 3 ? [] : this.service.searchMerchantUser(value)
        )
      )
      .subscribe(
        data => {
          this.showSpinner = false;
          this.dtOptions = {
            destroy: true,

            stateSave: false,
            paging: false,
            retrieve: true,
            searching: false,

            ordering: false,

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
                console.log(data);
                return row;
              });

              $("td #view", row).unbind("click");
              $("td #view", row).bind("click", () => {
                console.log(data);
                return row;
              });

              $("td #lock", row).unbind("click");
              $("td #lock", row).bind("click", () => {
                self.toggle(data);
                return row;
              });
            }
          };

          console.log(data);

          this.tableData = data;

          this.chRef.detectChanges();
          this.dtTrigger.next();
        },
        error => {
          console.log(error.message);
          this.toastr.error(error.statusText, error.message);
        }
      );
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy;
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  deleteDialog(data: any) {
    console.log(data);
    var userId = new sno();
    userId.value = data[4];
    this.deleteMerchantUser(userId);
  }

  deleteMerchantUser(data: sno) {
    if (confirm("Are you sure?")) {
      this.service
        .deleteMerchantuser(data)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (this.response["Status Code"] == 1000) {
              this.toastr.info(this.response["Message"]);
            } else {
              this.showSpinner = false;

              this.toastr.success(this.response["Message"]);
              this.rerender();
            }
          },
          error => {
            console.log("ERROR DELETING");
          }
        );
    }
    return false;
  }

  toggle(data: any) {
    var model = new dmu();
    model.companyBranch = data[1];
    model.merchantId = data[4];
    this.lockMerchantUser(model);
  }
  lockMerchantUser(model: dmu) {
    if (confirm("Are you sure you want to lock?")) {
      this.service
        .lockMerchantUser(model)
        .toPromise()
        .then(
          data2 => {
            this.response = data2;
            if (this.response["Status Code"] == 1000) {
              this.toastr.warning(this.response["Message"]);
            } else {
              this.showSpinner = false;

              this.toastr.success(this.response["Message"]);
              this.rerender();
            }
          },
          error => {
            console.log("ERROR LOcking");
          }
        );
    }
    return false;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  reloadPage() {
    // click handler or similar
    this.zone.runOutsideAngular(() => {
      location.reload();
    });
  }
}
