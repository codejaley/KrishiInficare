import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
declare var $;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  public showSpinner: boolean = false;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
      accesscode: ["", Validators.compose([Validators.required])]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.toastr.warning("Please Wait .......");
    this.showSpinner = true;

    this.authService

      .login({
        UserName: this.f.username.value,
        Password: this.f.password.value,
        AccessCode: this.f.accesscode.value
      })
      .subscribe(
        response => {
          console.log(response);
          this.showSpinner = true;

          if (response) {
            this.showSpinner = false;
            // window.location.replace("/mmsV1/dashboard");

            window.location.href = "/dashboard";
            //this.router.navigateByUrl("/login");
            // this.router.navigate(["/dashboard"]);

            /*   history.pushState(
            {
              id: "homepage"
            },
            "Home | Dashboard",
            "/dashboard"
          ); */
          } else {
            this.showSpinner = false;

            this.toastr.warning("Invalid Username or Password");

            //this.reloadPage();
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  reloadPage() {
    // click handler or similar
    this.zone.runOutsideAngular(() => {
      location.reload();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
}
