import { Component, OnInit, NgZone } from "@angular/core";
declare var $;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private zone: NgZone) {}

  ngOnInit(): void {}
  reloadPage() {
    // click handler or similar
    this.zone.runOutsideAngular(() => {
      location.reload();
    });
  }
}
