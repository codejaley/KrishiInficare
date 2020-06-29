import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  ChangeDetectorRef
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { OutletService } from "./../service/outlet.service";
import { ToastrService } from "ngx-toastr";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { DataTableDirective } from "angular-datatables";
import { Subject, Subscription } from "rxjs";
import { AuditOutlet } from "./../service/outlet.model";
@Component({
  selector: "app-updateoutlet",
  templateUrl: "./updateoutlet.component.html",
  styleUrls: ["./updateoutlet.component.css"]
})
export class UpdateoutletComponent implements OnInit {
  editOutletForm: FormGroup;
  @Input() vendorid;
  @Input() outletid;
  myvar;
  formdata: any;
  showSpinner: boolean = false;
  response: any;
  isSubmitted: boolean = false;
  categories: any;

  public event: EventEmitter<any> = new EventEmitter();

  VerifyAccountForm: FormGroup;
  responseVerify: any;
  accountVerified: boolean = false;

  active;

  auditData: AuditOutlet;
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings;
  dtTrigger: Subject<any> = new Subject();
  subscription: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,

    private service: OutletService,
    private toastr: ToastrService,
    private chRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.outletid;
    this.resetForm();
    this.resetVerifyAccountForm();
    this.getOutletDetail(this.outletid);
    this.getCategories();
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 4) {
      this.getAudit(this.outletid);
      this.chRef.detectChanges();

      this.dtTrigger.next();
    }
    if (changeEvent.nextId === 1) {
      this.getOutletDetail(this.outletid);
    }
    if (changeEvent.nextId === 3) {
      this.resetVerifyAccountForm();
      this.accountVerified = false;
    }
  }

  resetForm() {
    this.editOutletForm = this.formBuilder.group({
      Outlet_ID: [this.outletid],
      Vendor_ID: [this.vendorid],
      Outlet_Name: [null, Validators.required],
      Outlet_Address: [null, Validators.required],
      Outlet_City: [null, Validators.required],
      Outlet_State: [null, Validators.required],
      Key_Contact_Person: [null, Validators.compose([Validators.required])],
      Outlet_Email_ID: [null, Validators.email],
      Mobile_Number: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern("[0-9]*")
        ])
      ],
      Bank_Branch_Code: [null, Validators.required],
      Bank_Account_Number: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.pattern("[0-9]*")
        ])
      ],
      Category_ID: [null, Validators.required],
      Enable_Disable_FG: [null]
    });
  }

  get f() {
    return this.editOutletForm.controls;
  }

  resetVerifyAccountForm() {
    this.VerifyAccountForm = this.formBuilder.group({
      row_id: [this.outletid],
      account_no: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),

          Validators.pattern("[0-9]*")
        ])
      ],
      remarks: [null]
    });
  }

  get f2() {
    return this.VerifyAccountForm.controls;
  }

  getAudit(id: any) {
    this.subscription = this.service.getOutletAudit(id).subscribe(res => {
      this.auditData = res;
      console.log(this.auditData);
    });
  }

  verifyAccountno() {
    this.accountVerified = false;
    this.toastr.info("Verifying Please Wait", "", {
      timeOut: 20000
    });
    var name = this.f2.account_no.value;
    this.service
      .VerifyAccount({
        account_number: name
      })
      .subscribe(res => {
        this.responseVerify = res;

        if (this.responseVerify["Status"] == "SUCCESS") {
          this.accountVerified = true;

          this.toastr.clear();
          this.toastr.success(this.responseVerify["Message"], "", {
            timeOut: 1000
          });
        }
        if (
          this.responseVerify["Status"] == "FAILURE" ||
          this.responseVerify["Status"] == "Failure"
        ) {
          this.toastr.clear();
          this.accountVerified = false;

          this.toastr.warning(this.responseVerify["Message"]);
        }
      });
  }

  updateAccountno() {
    if (this.VerifyAccountForm.invalid) {
      return;
    }
    if ((this.accountVerified = true)) {
      this.toastr.info("Updating Please Wait", "", {
        timeOut: 20000
      });

      this.service

        .updateAccountnumber(this.VerifyAccountForm.value)
        .subscribe(res => {
          this.responseVerify = res;
          console.log(this.responseVerify);
          if (
            this.responseVerify["Status"] == "SUCCESS" ||
            this.responseVerify["Status"] == "Success"
          ) {
            this.resetVerifyAccountForm();
            this.triggerEvent("Success");
            this.toastr.clear();
            this.toastr.success(this.responseVerify["message"], "", {
              timeOut: 1000
            });
          }
          if (
            this.responseVerify["Status"] == "FAILURE" ||
            this.responseVerify["Status"] == "Failure"
          ) {
            this.toastr.clear();
            this.accountVerified = false;

            this.toastr.warning(this.responseVerify["Message"]);
          }
        });
    }
  }

  getCategories() {
    this.service.getCategoryList().subscribe(
      data => {
        console.log(data);
        this.categories = data;
      },
      error => {}
    );
  }

  getOutletDetail(id: string) {
    this.service.getOutletDetail(id).subscribe(
      res => {
        this.formdata = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateOutlet() {
    if (this.editOutletForm.invalid) {
      return;
    }
    this.service.updateOutlet(this.editOutletForm.value).subscribe(
      res => {
        this.response = res;
        console.log(this.response);

        if (this.response["Status"] == "Success") {
          this.triggerEvent("Success");
          this.resetForm();
          this.activeModal.dismiss();
          this.toastr.success(this.response["message"]);
        }
        if (this.response["Status"] == "Failure") {
          this.toastr.warning(this.response["Message"]);
        }
      },
      error => {
        for (let er of error.error.ErrorList) {
          this.toastr.warning(error.error.Message, er);
        }
        console.log(error);
      }
    );
  }

  triggerEvent(status: string) {
    this.event.emit({ data: status, res: 200 });
  }
}
