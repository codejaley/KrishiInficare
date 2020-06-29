import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OutletService } from "./../service/outlet.service";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-addoutlet",
  templateUrl: "./addoutlet.component.html",
  styleUrls: ["./addoutlet.component.css"]
})
export class AddoutletComponent implements OnInit {
  addOutletForm: FormGroup;
  @Input() vendorid;
  myvar;
  showSpinner: boolean = false;
  response: any;
  isSubmitted: boolean = false;
  categories: any;
  selectedCatID: any = null;

  VerifyAccountForm: FormGroup;
  responseVerify: any;
  accountVerified: boolean = false;

  active;

  isDisabled: boolean = false;
  isDisabled2: boolean = true;
  isDisabled3: boolean = true;

  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: OutletService,
    private toastr: ToastrService,

    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.vendorid;
    this.resetVerifyAccountForm();
    this.resetForm();
    this.getCategories();
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

  resetForm() {
    this.addOutletForm = this.formBuilder.group({
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
          Validators.minLength(9),
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
      Category_ID: [this.selectedCatID, Validators.required],
      Enable_Disable_FG: ["n"]
    });
  }

  get f() {
    return this.addOutletForm.controls;
  }

  resetVerifyAccountForm() {
    this.VerifyAccountForm = this.formBuilder.group({
      account_number: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),

          Validators.pattern("[0-9]*")
        ])
      ]
    });
  }

  get f2() {
    return this.VerifyAccountForm.controls;
  }

  verifyAccountno() {
    this.toastr.info("Verifying Please Wait", "", {
      timeOut: 20000
    });
    var name = this.f2.account_number.value;
    console.log(name);
    this.service.VerifyAccount(this.VerifyAccountForm.value).subscribe(res => {
      this.responseVerify = res;
      console.log(this.responseVerify);
      if (this.responseVerify["Status"] == "SUCCESS") {
        this.f.Bank_Account_Number.setValue(name);
        this.accountVerified = true;
        this.isDisabled = true;
        this.isDisabled3 = false;
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
        this.isDisabled = true;
        this.toastr.warning(this.responseVerify["Message"]);
      }
    });
  }

  addOutlet() {
    //this.activeModal.close(this.f);
    this.showSpinner = true;
    if (this.addOutletForm.invalid) {
      return;
    }
    console.log(this.addOutletForm.value);
    this.service.insertOutlet(this.addOutletForm.value).subscribe(
      res => {
        this.response = res;

        if (this.response["Status"] == "Success") {
          this.triggerEvent("Success");

          this.toastr.success(this.response["message"]);
          this.showSpinner = false;
          this.resetForm();
          this.activeModal.dismiss();
        }

        if (this.response["Status"] == "Failure") {
          this.toastr.warning(this.response["message"]);
          this.showSpinner = false;
        }
      },
      error => {
        for (let er of error.error.ErrorList) {
          this.toastr.warning(er);
        }
      }
    );
  }

  triggerEvent(status: string) {
    this.event.emit({ data: status, res: 200 });
  }
}
