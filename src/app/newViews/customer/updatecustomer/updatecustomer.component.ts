import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  ChangeDetectorRef,
  AfterViewInit
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DataTableDirective } from "angular-datatables";
import { Subject, Subscription } from "rxjs";
import { CustomerService } from "../services/customer.service";
import { ToastrService } from "ngx-toastr";
import { CategoriesService } from "../../categories/services/categories.service";
import { AuditCustomer } from "../../customer/services/customer.model";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-updatecustomer",
  templateUrl: "./updatecustomer.component.html",
  styleUrls: ["./updatecustomer.component.css"]
})
export class UpdatecustomerComponent implements OnInit {
  active;
  UpdateAccountForm: FormGroup;
  UpdatePhoneForm: FormGroup;
  @Input() private customerid;
  editcustomerForm: FormGroup;
  showSpinner: boolean = false;
  public event: EventEmitter<any> = new EventEmitter();
  data: any;
  cats: any;
  response: any;
  categories: any;
  auditData: AuditCustomer;
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings;
  dtTrigger: Subject<any> = new Subject();
  subscription: Subscription;
  responseVerify: any;
  accountVerified: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private catservice: CategoriesService,
    private service: CustomerService,
    private toastr: ToastrService,
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
      pageLength: 10
    };
    this.customerid;
    this.resetForm();
    this.resetAccountForm();
    this.resetPhoneForm();
    this.getCustomerDetail(this.customerid);

    this.toastr.clear();
    this.getcat();
  }

  ngAfterViewInit() {}

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 4) {
      this.getAudit(this.customerid);
      this.chRef.detectChanges();

      this.dtTrigger.next();
    }
    if (changeEvent.nextId === 1) {
      this.getCustomerDetail(this.customerid);
    }

    if (changeEvent.nextId === 2) {
      this.resetAccountForm();
      this.accountVerified = false;
    }
  }

  verifyAccountno() {
    this.toastr.info("Verifying Please Wait", "", {
      timeOut: 20000
    });
    var name = this.f2.account_no.value;
    console.log(name);
    this.service
      .VerifyAccount({
        account_number: name
      })
      .subscribe(res => {
        this.responseVerify = res;
        console.log(this.responseVerify);
        if (this.responseVerify["Status"] == "SUCCESS") {
          this.f.Bank_Account_Number.setValue(name);
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

  getcat() {
    this.catservice.getCategorieslist().subscribe(data => {
      this.categories = data;
    });
  }

  resetForm() {
    this.editcustomerForm = this.formBuilder.group({
      Customer_ID: [this.customerid],
      Customer_Name: ["", Validators.required],
      Customer_Address: ["", Validators.required],
      Customer_City: ["", Validators.required],
      Customer_State: ["", Validators.required],
      Mobile_Number: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern("[0-9]*")
        ])
      ],

      Customer_Email_ID: ["", Validators.email],
      Loan_Approval_ID: ["", Validators.required],
      Bank_Branch_Code: ["", Validators.compose([Validators.required])],
      Bank_Account_Number: [
        null,
        Validators.compose([
          Validators.minLength(10),
          Validators.required,
          Validators.pattern("[0-9]*")
        ])
      ],
      Image_Name: [null],
      Account_Verify_TS: null,
      Account_Verify_Status: null,
      Categories: null,
      Enable_Disable_FG: [null]
    });
  }

  resetAccountForm() {
    this.UpdateAccountForm = this.formBuilder.group({
      row_id: [this.customerid],
      account_no: [
        null,
        Validators.compose([
          Validators.minLength(10),
          Validators.required,
          Validators.pattern("[0-9]*")
        ])
      ],
      remarks: [null]
    });
  }

  resetPhoneForm() {
    this.UpdatePhoneForm = this.formBuilder.group({
      row_id: [this.customerid],
      phone_no: [
        null,
        Validators.compose([
          Validators.minLength(10),
          Validators.required,
          Validators.pattern("[0-9]*")
        ])
      ],
      remarks: null
    });
  }

  getCustomerDetail(id: string) {
    this.service.getCustomerDetail(id).subscribe(
      res => {
        this.data = res["result"];
        this.cats = res["categories"];
      },

      error => {
        this.toastr.warning(error.error.Message);
      }
    );
  }

  getAudit(id: any) {
    this.subscription = this.service.getCustomerAudit(id).subscribe(res => {
      this.auditData = res;
      console.log(this.auditData);
    });
  }

  get f() {
    return this.editcustomerForm.controls;
  }

  updateCustomer() {
    if (this.editcustomerForm.invalid) {
      return;
    }

    this.service.updateCustomer(this.editcustomerForm.value).subscribe(
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
          this.toastr.warning(this.response["message"]);
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

  get f2() {
    return this.UpdateAccountForm.controls;
  }

  updateAccountno() {
    this.service
      .updateAccountnumber(this.UpdateAccountForm.value)
      .subscribe(data => {
        this.response = data;
        if (this.response["Status"] == "Success") {
          this.toastr.success(this.response["message"]);
          this.triggerEvent("Success");
          this.resetAccountForm();
          this.accountVerified = false;
        }
        if (this.response["Status"] == "Failure") {
          this.toastr.success(this.response["message"]);
        }
      });
  }

  get f3() {
    return this.UpdatePhoneForm.controls;
  }

  updatePhoneno() {
    this.service.updatePhoneno(this.UpdatePhoneForm.value).subscribe(data => {
      console.log(data);
      this.response = data;
      if (this.response["Status"] == "Success") {
        this.toastr.success(this.response["message"]);
        this.triggerEvent("Success");
        this.resetPhoneForm();
      }
      if (this.response["Status"] == "Failure") {
        this.toastr.success(this.response["message"]);
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event

    this.dtTrigger.unsubscribe();
  }

  triggerEvent(status: string) {
    this.event.emit({ data: status, res: 200 });
  }
}
