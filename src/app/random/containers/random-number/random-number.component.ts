import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { RandomNumberService } from "../../services/random-number.service";
import { AuthService } from "src/app/auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-random-number",
  templateUrl: "./random-number.component.html",
  styleUrls: ["./random-number.component.css"]
})
export class RandomNumberComponent implements OnInit {
  randomNumber: Observable<string[]>;

  constructor(
    private random: RandomNumberService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.randomNumber = this.random.getRandomNumber();
    console.log(this.randomNumber);
  }

  // logout() {
  //   this.authService.logout().subscribe(res => {
  //     if (res) {
  //       this.router.navigate(["/login"]);
  //     }
  //   });
  // }
}
