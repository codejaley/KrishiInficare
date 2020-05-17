import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivityService } from "../services/activity.service";
import { R3ExpressionFactoryMetadata } from "@angular/compiler/src/render3/r3_factory";
@Component({
  selector: "app-edit-activity",
  templateUrl: "./edit-activity.component.html",
  styleUrls: ["./edit-activity.component.css"]
})
export class EditActivityComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: ActivityService
  ) {}

  ngOnInit(): void {}
}
