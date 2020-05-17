import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import {
  NgbNavChangeEvent,
  NgbNav,
  NgbActiveModal,
  NgbModal
} from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { ToastrService } from "ngx-toastr";
import { MerchantuserService } from "../services/merchantuser.service";
import { validateHorizontalPosition } from "@angular/cdk/overlay";
@Component({
  selector: "app-addmerchantuser",
  templateUrl: "./addmerchantuser.component.html",
  styleUrls: ["./addmerchantuser.component.css"]
})
export class AddmerchantuserComponent implements OnInit {
  @Input() private agentCode;
  @Input() private agentBranchCode;
  isSubmitted = false;
  response: any;

  merchantid;
  active;
  disabled = true;

  checked = true;

  sms = null;
  diso = "y";
  method = "ALL";
  dlimit = "y";
  dScharge = "y";

  Scharge: string = "T";

  addmerchantuserForm: FormGroup;

  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: MerchantuserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.agentCode);
    console.log(this.agentBranchCode);
    this.merchantid = this.agentBranchCode;

    this.resetForm();
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {}
  toggle(event: MatCheckboxChange) {
    this.checked = !this.checked;
    if (!this.checked) {
      this.sms = "y";

      this.f.enable_sms_alert.setValue(this.sms);
    }
    if (this.checked) {
      this.sms = null;

      this.f.enable_sms_alert.setValue(this.sms);
    }
  }
  toggle1(event: MatCheckboxChange) {
    this.checked = !this.checked;
    this.disabled = !this.disabled;

    if (this.checked) {
      this.diso = "y";

      this.f.default_iso.setValue(this.diso);
      this.f.ISO_32.setValue(null);
      this.f.ISO_41.setValue(null);
      this.f.ISO_42.setValue(null);
      this.f.ISO_43.setValue(null);
    }
    if (!this.checked) {
      this.diso = null;

      this.f.default_iso.setValue(this.diso);
    }
  }

  toggle2(event: MatCheckboxChange) {
    this.checked = !this.checked;
    this.disabled = !this.disabled;

    if (this.checked) {
      this.method = "ALL";

      this.f.method_name.setValue(this.method);
    }
    if (!this.checked) {
      this.method = null;

      this.f.method_name.setValue(this.method);
    }
  }

  toggle3(event: MatCheckboxChange) {
    this.checked = !this.checked;
    this.disabled = !this.disabled;

    if (this.checked) {
      this.dlimit = "y";

      this.f.default_limit.setValue(this.dlimit);

      this.f.deposit_per_day.setValue(0);
      this.f.withdraw_per_day.setValue(0);
      this.f.deposit_per_transaction.setValue(0);
      this.f.withdraw_per_transaction.setValue(0);
      this.f.min_deposit_per_transaction.setValue(0);
      this.f.min_withdraw_per_transaction.setValue(0);
      this.f.query_per_account.setValue(null);
    }
    if (!this.checked) {
      this.dlimit = null;

      this.f.default_limit.setValue(this.dlimit);
    }
  }

  toggle4(event: MatCheckboxChange) {
    this.checked = !this.checked;
    this.disabled = !this.disabled;

    if (this.checked) {
      this.dScharge = "y";

      this.f.default_serviceCharge.setValue(this.dScharge);

      this.f.sChargeAmt.setValue(0);
    }
    if (!this.checked) {
      this.dScharge = null;

      this.f.default_serviceCharge.setValue(this.dScharge);
    }
  }

  resetForm() {
    this.addmerchantuserForm = this.formBuilder.group({
      User_login_Id: [null, Validators.required],
      user_email: [null],
      user_post: [null],
      merchant_accountno: [null],
      url: [null],
      enable_sms_alert: [this.sms],
      user_remarks: [null],
      user_name: [null],
      user_address: ["NEPAL"],
      agent_branch_code: [this.merchantid],
      agentCode: [this.agentCode],
      SIGNATURE_Passcode: [null],
      allow_ip_address: [null],
      User_pwd: [null],
      dlr_URL: [null],

      default_iso: [this.diso],
      ISO_32: [null],
      ISO_41: [null],
      ISO_42: [null],
      ISO_43: [null],

      method_name: [this.method],

      default_limit: [this.dlimit],
      deposit_per_day: [0],
      withdraw_per_day: [0],
      deposit_per_transaction: [0],
      withdraw_per_transaction: [0],
      min_deposit_per_transaction: [0],
      min_withdraw_per_transaction: [0],
      query_per_account: [null],

      default_serviceCharge: [this.dScharge],
      sChargeType: [this.Scharge],
      sChargeAmt: [0]
    });
  }

  get f() {
    return this.addmerchantuserForm.controls;
  }

  addmerchantUser() {
    console.log(this.addmerchantuserForm.value);
    //this.activeModal.close(this.f);
    this.isSubmitted = true;
    if (this.addmerchantuserForm.invalid) {
      return;
    }

    var data = this.addmerchantuserForm.value;

    this.service.insertMerchantUser(data).subscribe(
      res => {
        this.response = res;
        console.log(this.response);
        console.log(data);
        if (this.response["Status Code"] == 0) {
          this.triggerEvent("Success");
          this.toastr.success(this.response["Message"]);
          this.isSubmitted = false;
          this.resetForm();
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
