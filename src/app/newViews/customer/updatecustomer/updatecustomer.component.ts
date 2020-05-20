import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerService } from "../services/customer.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-updatecustomer",
  templateUrl: "./updatecustomer.component.html",
  styleUrls: ["./updatecustomer.component.css"]
})
export class UpdatecustomerComponent implements OnInit {
  @Input() private vendorid;
  editcustomerForm: FormGroup;
  showSpinner: boolean = false;
  public event: EventEmitter<any> = new EventEmitter();
  data: any;
  response: any;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,

    private service: CustomerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.resetForm();
    this.getCustomerDetail(this.vendorid);
  }

  resetForm() {
    this.editcustomerForm = this.formBuilder.group({
      Customer_ID: [this.vendorid],
      Customer_Name: [null, Validators.required],
      Customer_Address: [null, Validators.required],
      Customer_City: [null, Validators.required],
      Customer_State: [null, Validators.required],
      Mobile_Number: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern("[0-9]*")
        ])
      ],

      Customer_Email_ID: [null, Validators.email],
      Loan_Approval_ID: [null],
      Bank_Branch_Code: [null, Validators.compose([Validators.required])],
      Bank_Account_Number: [
        null,
        Validators.compose([
          Validators.minLength(10),
          Validators.required,
          Validators.pattern("[0-9]*")
        ])
      ],
      QR_Code_ID: ["1", Validators.required],
      Enable_Disable_FG: ["", Validators.required]
    });
  }

  getCustomerDetail(agentBranchCode: string) {
    this.service.getCustomerDetail(this.vendorid).subscribe(
      res => {
        this.data = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  get f() {
    return this.editcustomerForm.controls;
  }
  updateCustomer() {
    console.log(this.editcustomerForm.value);

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
