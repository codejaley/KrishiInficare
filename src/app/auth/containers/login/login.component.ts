import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { config } from "rxjs";
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
    this.toastr.warning("Please Wait .......", "", {
      timeOut: 11000
    });
    this.showSpinner = true;

    this.authService

      .login({
        UserName: this.f.username.value,
        Password: this.f.password.value,
        AccessCode: this.f.accesscode.value
      })
      .subscribe(
        response => {
          this.showSpinner = true;

          if (response) {
            this.toastr.clear();
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
          }
        },
        error => {
          console.log(error);
          this.toastr.clear();
          this.toastr.warning(error.error.Message, error.status);
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
