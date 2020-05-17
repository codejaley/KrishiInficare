import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "./../services/user.service";
import { ToastrService } from "ngx-toastr";

import { AuthService } from "./../../../auth/services/auth.service";
import { tap } from "rxjs/operators";
@Component({
  selector: "app-changepassword",
  templateUrl: "./changepassword.component.html",
  styleUrls: ["./changepassword.component.css"]
})
export class ChangepasswordComponent implements OnInit {
  private readonly JWT_TOKEN = "JWT_TOKEN";
  isLoading = false;
  title = "Change Password";
  hide = true;
  hide2 = true;
  response: any;
  changepasswordform: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.resetform();
  }

  get f() {
    return this.changepasswordform.controls;
  }

  resetform() {
    this.changepasswordform = this.formBuilder.group({
      NewPassword: [
        "",
        Validators.compose([Validators.required, Validators.minLength(7)])
      ],
      ConfirmPassword: [
        "",
        Validators.compose([Validators.required, Validators.minLength(7)])
      ]
    });
  }

  updatePassword() {
    if (this.changepasswordform.invalid) {
      return;
    } else {
      this.isLoading = true;
      this.service
        .updatePassword(this.changepasswordform.value)

        .toPromise()
        .then(
          res => {
            this.response = res;
            console.log(this.response);

            if (this.response["Status"] == "Success") {
              this.isLoading = false;
              this.toastr.success(this.response["Message"]);
              let jwt = this.response["Token"];
              console.log(jwt);
              localStorage.setItem(this.JWT_TOKEN, jwt);
              this.resetform();
            }
          },
          error => {
            console.log(error);
            this.isLoading = false;
            if (error.error.ErrorList) {
              for (let er of error.error.ErrorList) {
                this.toastr.warning(er);
              }
            } else {
              this.toastr.warning(error.error.Message);
            }
          }
        );
    }
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
