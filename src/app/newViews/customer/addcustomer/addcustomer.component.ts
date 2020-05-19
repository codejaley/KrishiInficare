import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Customer } from "../services/customer.model";
import { CustomerService } from "../services/customer.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-addcustomer",
  templateUrl: "./addcustomer.component.html",
  styleUrls: ["./addcustomer.component.css"]
})
export class AddcustomerComponent implements OnInit {
  addcustomerForm: FormGroup;
  customer2: Customer;
  myvar;
  showSpinner: boolean = false;
  response: any;
  isSubmitted: boolean = false;

  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: CustomerService,
    private toastr: ToastrService,

    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm() {
    this.addcustomerForm = this.formBuilder.group({
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

  get f() {
    return this.addcustomerForm.controls;
  }

  addCustomer() {
    //this.activeModal.close(this.f);
    this.showSpinner = true;
    if (this.addcustomerForm.invalid) {
      return;
    }
    this.service.insertCustomer(this.addcustomerForm.value).subscribe(
      res => {
        this.response = res;

        if (this.response["Status"] == "Success") {
          this.triggerEvent("Success");
          this.toastr.success(this.response["message"]);
          this.showSpinner = false;
          this.resetForm();
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

  // reloadPage() {
  //   // click handler or similar
  //   this.zone.runOutsideAngular(() => {
  //     location.reload();
  //   });
  // }
}
