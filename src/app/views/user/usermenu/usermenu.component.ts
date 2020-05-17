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
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { menuprivilege } from "./../services/user.model";
import { UserService } from "./../services/user.service";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { extend } from "webdriver-js-extender";

@Component({
  selector: "app-usermenu",
  templateUrl: "./usermenu.component.html",
  styleUrls: ["./usermenu.component.css"]
})
export class UsermenuComponent implements OnInit {
  title = "Rights Detail for User";
  userLoginId: string;
  usermenuForm: FormGroup;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  showSpinner: boolean = true;

  tableData: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  response: any;
  status: string;

  selectAll: boolean = false;
  valueList: [];
  constructor(
    private dataRoute: ActivatedRoute,
    private chRef: ChangeDetectorRef,
    private service: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,

      paging: false
    };
    this.userLoginId = this.dataRoute.snapshot.paramMap.get("id");
    this.resetForm();
    this.getUserMenuPrivilege(this.userLoginId);
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getUserMenuPrivilege(id: string) {
    this.service.getUsermenuPrvildg(id).subscribe(
      data => {
        this.showSpinner = false;
        this.tableData = data;
        console.log(data);
        this.chRef.detectChanges();

        this.dtTrigger.next();
      },
      error => {
        console.log(error.error.Message);
      }
    );
  }

  resetForm() {
    this.usermenuForm = this.formBuilder.group({
      funcRights: this.formBuilder.array([]),
      userloginId: [this.userLoginId]
    });
  }

  get f() {
    return this.usermenuForm.controls;
  }

  selectAllCheckBox() {
    this.selectAll = !this.selectAll;
  }

  onCheckBoxChange(event) {
    const funcRights: FormArray = this.usermenuForm.get(
      "funcRights"
    ) as FormArray;

    if (event.source.checked) {
      funcRights.push(new FormControl(event.source.value));
    } else {
      let i: number = 0;
      funcRights.controls.forEach((item: FormControl) => {
        if (item.value == event.source.value) {
          funcRights.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitUsermenu() {
    this.service
      .editUsermenuPrvildg({
        funcRights: this.f.funcRights.value.toString(),
        userloginId: this.userLoginId
      })
      .subscribe(
        data => {
          this.response = data;
          if (this.response["Status Code"] == 0) {
            this.toastr.success(this.response["Message"]);
            this.service
              .getUsermenuPrvildg(this.userLoginId)
              .subscribe(data => {
                this.tableData = data;
                console.log("going to rerender");
                this.rerender();
              });
          }
          if (this.response["Status Code"] == 5000) {
            this.toastr.info(this.response["Message"]);
          }
        },
        error => {
          console.log(error);
          if (error.error.ErrorList) {
            for (let er of error.error.ErrorList) {
              this.toastr.warning(error.error.Message, er, {
                timeOut: 6000
              });
            }
          } else {
            this.toastr.warning("BAD REQUEST", error.error.Message);
          }
        }
      );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
