import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-header-top",
  templateUrl: "./header-top.component.html",
  styleUrls: ["./header-top.component.css"]
})
export class HeaderTopComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.confirm();
  }

  confirm() {
    if (confirm("Are you sure you want to logout?")) {
      this.toastr.warning("Please Wait........", "Logging Out", {
        timeOut: 1000
      });

      this.authService.logout().subscribe(success => {
        if (success) {
          this.router.navigate(["/login"]);
        }
      });
    }

    return false;
  }
}
