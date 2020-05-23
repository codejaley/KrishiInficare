import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { OutletUserService } from "./../service/outletuser.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-updateoutletuser",
  templateUrl: "./updateoutletuser.component.html",
  styleUrls: ["./updateoutletuser.component.css"]
})
export class UpdateoutletuserComponent implements OnInit {
  editOutletUserForm: FormGroup;
  @Input() outletUserid;
  @Input() outletid;
  myvar;
  formdata: any;
  showSpinner: boolean = false;
  response: any;
  isSubmitted: boolean = false;

  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,

    private service: OutletUserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.outletid);
    console.log(this.outletUserid);
    this.resetForm();
    this.getOutletUserDetail(this.outletUserid);
  }

  resetForm() {
    this.editOutletUserForm = this.formBuilder.group({
      Outlet_User_ID: [this.outletUserid],
      Outlet_Login_ID: [null, Validators.required],
      Oultet_User_Pwd: [null],
      matchedPass: [null],
      Outlet_ID: [this.outletid],
      Rights: [null],
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
      Last_Login_TS: null,
      Created_BY: null,
      Created_TS: null,
      Last_Pwd_Change_TS: null,
      IP: null
    });
  }

  get f() {
    return this.editOutletUserForm.controls;
  }

  getOutletUserDetail(id: string) {
    this.service.getOutletUserDetail(id).subscribe(
      res => {
        console.log(res);
        this.formdata = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateOutletUser() {
    console.log(this.editOutletUserForm.value);

    if (this.editOutletUserForm.invalid) {
      return;
    }
    this.service.updateOutletUser(this.editOutletUserForm.value).subscribe(
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
