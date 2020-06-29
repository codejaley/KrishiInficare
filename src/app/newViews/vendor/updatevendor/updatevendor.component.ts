import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VendorService } from "../service/vendor.service";
import { Vendor } from "../service/vendor.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-updatevendor",
  templateUrl: "./updatevendor.component.html",
  styleUrls: ["./updatevendor.component.css"]
})
export class UpdatevendorComponent implements OnInit {
  @Input() private vendorId;

  editVendorForm: FormGroup;

  myvar;
  showSpinner: boolean = false;
  vendorDetail: Vendor;
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
    this.vendorId;
    this.resetForm();
    this.getVendorDetail(this.vendorId);
  }

  resetForm() {
    this.editVendorForm = this.formBuilder.group({
      Vendor_ID: [this.vendorId, Validators.required],
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
    return this.editVendorForm.controls;
  }

  getVendorDetail(id: any) {
    this.service.getVendorDetail(id).subscribe(data => {
      this.vendorDetail = data;
      console.log(this.vendorDetail);
    });
  }

  updateVendor() {
    this.showSpinner = true;
    if (this.editVendorForm.invalid) {
      return;
    }
    this.service.updateVendor(this.editVendorForm.value).subscribe(
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
