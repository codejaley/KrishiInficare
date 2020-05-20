import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OutletService } from "./../service/outlet.service";

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

  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: OutletService,
    private toastr: ToastrService,

    private zone: NgZone
  ) {}

  ngOnInit(): void {
    console.log(this.vendorid);
    this.vendorid;
    this.resetForm();
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
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern("[0-9]*")
        ])
      ],
      Bank_Branch_Code: [null, Validators.required],
      Bank_Account_Number: [
        null,
        Validators.compose([Validators.required, Validators.minLength(9)])
      ],
      Category_ID: [this.vendorid],
      Enable_Disable_FG: ["n"]
    });
  }

  get f() {
    return this.addOutletForm.controls;
  }

  addOutlet() {
    //this.activeModal.close(this.f);
    this.showSpinner = true;
    if (this.addOutletForm.invalid) {
      return;
    }
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
