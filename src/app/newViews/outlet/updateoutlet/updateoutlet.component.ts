import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { OutletService } from "./../service/outlet.service";
import { ToastrService } from "ngx-toastr";

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

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,

    private service: OutletService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.outletid;
    this.resetForm();
    this.getOutletDetail(this.outletid);
    this.getCategories();
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
    console.log(this.editOutletForm.value);

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
