import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-viewcompany",
  templateUrl: "./viewcompany.component.html",
  styleUrls: ["./viewcompany.component.css"]
})
export class ViewcompanyComponent implements OnInit {
  @Input() public viewdata;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
