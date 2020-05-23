import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OutletUserService } from "../service/outletuser.service";
import { Outletuser } from "../service/outletuser.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-addoutletuser",
  templateUrl: "./addoutletuser.component.html",
  styleUrls: ["./addoutletuser.component.css"]
})
export class AddoutletuserComponent implements OnInit {
  @Input() public outletid;
  addOutletUserForm: FormGroup;

  myvar;
  showSpinner: boolean = false;
  response: any;
  isSubmitted: boolean = false;
  rights;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: OutletUserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.outletid;
    console.log(this.outletid);

    this.resetForm();
  }

  resetForm() {
    this.addOutletUserForm = this.formBuilder.group({
      Outlet_Login_ID: [null, Validators.required],
      Oultet_User_Pwd: [null],
      matchedPass: [null],
      Outlet_ID: [this.outletid],
      Rights: [this.rights],
      User_Name: [null, Validators.required],
      Outlet_Name: [null],

      User_Email: [null, Validators.email],
      User_Mobile: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern("[0-9]*")
        ])
      ],

      Enable_Disable_FG: ["n"],
      Last_Login_TS: [null],
      Created_BY: null,
      Created_TS: null,
      Last_Pwd_Change_TS: [null],
      IP: null
    });
  }

  get f() {
    return this.addOutletUserForm.controls;
  }

  addOutletUser() {
    //this.activeModal.close(this.f);
    this.showSpinner = true;
    if (this.addOutletUserForm.invalid) {
      return;
    }
    this.service.insertOutletUser(this.addOutletUserForm.value).subscribe(
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
