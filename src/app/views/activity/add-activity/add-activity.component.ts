import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivityService } from "../services/activity.service";
import { R3ExpressionFactoryMetadata } from "@angular/compiler/src/render3/r3_factory";

@Component({
  selector: "app-add-activity",
  templateUrl: "./add-activity.component.html",
  styleUrls: ["./add-activity.component.css"]
})
export class AddActivityComponent implements OnInit {
  addactivityForm: FormGroup;
  myvar;

  @Input() public user;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: ActivityService
  ) {}

  ngOnInit(): void {
    this.addactivityForm = this.formBuilder.group({
      name: ["Test Name"],
      job: ["Test Description"]
    });
  }

  get f() {
    return this.addactivityForm.controls;
  }

  addActivity() {
    this.activeModal.close(this.f);
  }
}
