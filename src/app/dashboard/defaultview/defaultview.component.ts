import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-defaultview",
  templateUrl: "./defaultview.component.html",
  styleUrls: ["./defaultview.component.css"]
})
export class DefaultviewComponent implements OnInit {
  dateToday: number = Date.now();
  constructor() {}

  ngOnInit(): void {}
}
