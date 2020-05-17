import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "../services/user.model";
import { UserService } from "../services/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-createuser",
  templateUrl: "./createuser.component.html",
  styleUrls: ["./createuser.component.css"]
})
export class CreateuserComponent implements OnInit {
  myvar;

  response: any;
  isSubmitted = false;
  @Input() public user;

  title: "User";
  createUser: FormGroup;

  public event: EventEmitter<any> = new EventEmitter();
  res: any;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: UserService,
    private toastr: ToastrService,

    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm() {
    this.createUser = this.formBuilder.group({
      cUser: [null, Validators.required],
      rights: [null, Validators.required],
      user_codeno: [null, Validators.required],

      email_id: [null, Validators.email],
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

  get f() {
    return this.createUser.controls;
  }

  addUser() {
    //this.activeModal.close(this.f);
    this.isSubmitted = true;

    this.service.insertUser(this.createUser.value).subscribe(
      res => {
        this.response = res;
        console.log(this.response);
        console.log(this.createUser.value);
        if (this.response["Status_Code"] == 0) {
          this.triggerEvent("Success");
          this.toastr.success(this.response["message"]);
          this.isSubmitted = false;
          this.resetForm();
        }
        if (this.response["Status_Code"] == 5555) {
          this.triggerEvent("Fail");
          this.toastr.warning("Exist Already");
          this.isSubmitted = false;
          this.resetForm();
        }
      },
      error => {
        if (error.error.ErrorList) {
          for (let er of error.error.ErrorList) {
            this.toastr.warning(er);
          }
        } else {
          this.toastr.warning(error.message);
        }
      }
    );
  }

  triggerEvent(status: string) {
    this.event.emit({ data: status, res: 200 });
  }
}
