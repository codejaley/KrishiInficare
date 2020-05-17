import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import {
  NgbNavChangeEvent,
  NgbNav,
  NgbActiveModal,
  NgbModal
} from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import {} from "@angular/material/select";
import { ToastrService } from "ngx-toastr";
import { MerchantuserService } from "../services/merchantuser.service";
import { Observable } from "rxjs";
import { Merchantuser } from "../services/merchantuser.model";
import { TransactionfeeComponent } from "../transactionfee/transactionfee.component";

@Component({
  selector: "app-updatemerchantuser",
  templateUrl: "./updatemerchantuser.component.html",
  styleUrls: ["./updatemerchantuser.component.css"]
})
export class UpdatemerchantuserComponent implements OnInit {
  @Input() private agentCode;
  @Input() private agentBranchCode;
  @Input() private agentUserId;

  isSubmitted = false;
  response: any;

  merchantid;
  active;
  disabled = true;

  checked = true;
  c1;
  d1;
  updatemerchantuserForm: FormGroup;

  sms = null;

  diso = "y";
  method = "ALL";
  dlimit = "y";
  dScharge = "y";

  Scharge: string;

  dData: Merchantuser;

  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: MerchantuserService,
    private toastr: ToastrService,
    public dialog: NgbModal
  ) {}

  ngOnInit(): void {
    this.resetForm();
    this.getMuserDetail(this.agentUserId);

    if (this.dData.enable_sms_alert == null) {
      this.c1 = false;
    } else if (this.dData.enable_sms_alert == "y") {
      this.c1 = true;
    }

    if (this.dData.default_iso == null) {
      this.checked = false;
      this.disabled = false;
    } else if (this.dData.default_iso == "y") {
      this.checked = true;
      this.disabled = true;
    }

    if (this.dData.default_serviceCharge == null) {
      this.checked = false;
      this.disabled = false;
    } else if (this.dData.default_serviceCharge == "y") {
      this.checked = true;
      this.disabled = true;
    }
  }

  resetForm() {
    this.updatemerchantuserForm = this.formBuilder.group({
      agent_user_id: [this.agentUserId],
      User_login_Id: [null, Validators.required],
      user_email: [null],
      user_post: [null],
      merchant_accountno: [null],
      url: [null],
      enable_sms_alert: [this.sms],
      user_remarks: [null],
      user_name: [null],
      user_address: ["NEPAL"],
      agent_branch_code: [this.agentBranchCode],
      agentCode: [this.agentCode],
      SIGNATURE_Passcode: [null],
      allow_ip_address: [null],

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
      sChargeAmt: [0],

      limited_date: [0],
      lock_days: 0,
      last_login: [null],
      upload: "No"
    });
  }

  getMuserDetail(agentUserId: string) {
    this.service.getMerchantUserDetail(agentUserId).subscribe(
      res => {
        if (res !== null) {
          this.dData = res;
          console.log(this.dData);
        } else {
          alert("UNKNOWN ERROR");
          this.activeModal.close();
        }
      },
      error => {
        this.toastr.warning("BAD REQUEST");
        this.activeModal.close();
      }
    );
  }

  toggle(event: MatCheckboxChange) {
    this.c1 = !this.c1;
    if (this.c1) {
      this.dData.enable_sms_alert = "y";

      this.f.enable_sms_alert.setValue(this.dData.enable_sms_alert);
    }
    if (!this.c1) {
      this.dData.enable_sms_alert = null;

      this.f.enable_sms_alert.setValue(this.dData.enable_sms_alert);
    }
  }
  toggle1(event: MatCheckboxChange) {
    this.checked = !this.checked;
    this.disabled = !this.disabled;

    if (this.checked) {
      this.dData.default_iso = "y";

      this.f.default_iso.setValue(this.dData.default_iso);
      this.f.ISO_32.setValue(null);
      this.f.ISO_41.setValue(null);
      this.f.ISO_42.setValue(null);
      this.f.ISO_43.setValue(null);
    }
    if (!this.checked) {
      this.dData.default_iso = null;

      this.f.default_iso.setValue(this.dData.default_iso);
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
      this.dData.default_serviceCharge = "y";

      this.f.default_serviceCharge.setValue(this.dData.default_serviceCharge);

      this.f.sChargeAmt.setValue(0);
    }
    if (!this.checked) {
      this.dData.default_serviceCharge = null;

      this.f.default_serviceCharge.setValue(this.dData.default_serviceCharge);
    }
  }
  get f() {
    return this.updatemerchantuserForm.controls;
  }

  updateMuser() {
    console.log(this.updatemerchantuserForm.value);
    this.isSubmitted = true;
    if (this.updatemerchantuserForm.invalid) {
      return;
    }
    this.service
      .updateMerchantUser(this.updatemerchantuserForm.value)
      .subscribe(
        res => {
          this.response = res;
          console.log(this.response);
          console.log(this.updatemerchantuserForm.value);
          if (this.response["Status Code"] == 0) {
            this.triggerEvent("Success");
            this.toastr.success(this.response["Message"]);
            this.isSubmitted = false;
          }
        },
        error => {
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

  triggerEvent(status: string) {
    this.event.emit({ data: status, res: 200 });
  }

  transactionFee() {
    const modalref = this.dialog.open(TransactionfeeComponent);
  }
}
