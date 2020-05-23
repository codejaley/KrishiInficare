import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VendorService } from "../service/vendor.service";
import { Vendor } from "../service/vendor.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-addvendor",
  templateUrl: "./addvendor.component.html",
  styleUrls: ["./addvendor.component.css"]
})
export class AddvendorComponent implements OnInit {
  addVendorForm: FormGroup;

  myvar;
  showSpinner: boolean = false;
  response: any;
  isSubmitted: boolean = false;

  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: VendorService,
    private toastr: ToastrService,

    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm() {
    this.addVendorForm = this.formBuilder.group({
      Vendor_Name: [null, Validators.required],
      Vendor_Address: [null, Validators.required],
      Vendor_City: [null, Validators.required],
      Vendor_State: [null, Validators.required],
      Vendor_Contact_Person: [null, Validators.compose([Validators.required])],
      Vendor_Mobile_Number: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern("[0-9]*")
        ])
      ],

      Vendor_Email_ID: [null, Validators.email]
    });
  }

  get f() {
    return this.addVendorForm.controls;
  }

  addVendor() {
    //this.activeModal.close(this.f);
    this.showSpinner = true;
    if (this.addVendorForm.invalid) {
      return;
    }
    this.service.insertVendor(this.addVendorForm.value).subscribe(
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
