import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "./../services/user.model";
import { UserService } from "./../services/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edituser",
  templateUrl: "./edituser.component.html",
  styleUrls: ["./edituser.component.css"]
})
export class EdituserComponent implements OnInit {
  title = "Users";

  updateUserForm: FormGroup;
  myvar;
  data: any;
  response: any;
  isSubmitted = false;
  @Input() public updatedata;
  private id: string;

  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.resetForm();
    this.getUserDetail((this.id = this.updatedata));
  }

  getUserDetail(userLoginId: string) {
    this.service.getUsersDetail(userLoginId).subscribe(
      res => {
        this.data = res;
        console.log(this.data);
      },
      error => {
        console.log(error);
      }
    );
  }

  resetForm() {
    this.updateUserForm = this.formBuilder.group({
      cUser: [null, Validators.required],
      rights: [null, Validators.required],
      user_codeno: [null, Validators.required],

      email_id: [
        null,
        Validators.compose([Validators.email, Validators.required])
      ],
      lock_days: [null],
      limited_date: [null],
      staff_name: [null, Validators.required],
      address: [null],
      telephone: [
        null,
        Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern("[0-9]*")
        ])
      ],
      lastdatechanged: [null]
    });
  }

  updateUser() {
    this.isSubmitted = true;
    if (this.updateUserForm.invalid) {
      return;
    }
    this.service.updateUser(this.updateUserForm.value).subscribe(
      res => {
        this.response = res;

        if (
          this.response["Status Code"] == 0 ||
          this.response["Status"] == "Success"
        ) {
          this.triggerEvent("Success");
          this.toastr.success(this.response["message"]);
          this.isSubmitted = false;
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
}
