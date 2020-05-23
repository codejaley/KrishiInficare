import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Categories } from "../services/categories.model";
import { CategoriesService } from "../services/categories.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-addcategories",
  templateUrl: "./addcategories.component.html",
  styleUrls: ["./addcategories.component.css"]
})
export class AddcategoriesComponent implements OnInit {
  addcategoriesForm: FormGroup;

  myvar;
  showSpinner: boolean = false;
  response: any;
  isSubmitted: boolean = false;

  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: CategoriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm() {
    this.addcategoriesForm = this.formBuilder.group({
      // Category_ID: [null],
      Category_Name: [null, Validators.required],
      Category_Description: [null, Validators.required]
    });
  }

  get f() {
    return this.addcategoriesForm.controls;
  }

  addCategory() {
    //this.activeModal.close(this.f);
    this.showSpinner = true;
    if (this.addcategoriesForm.invalid) {
      return;
    }
    this.service.insertCategory(this.addcategoriesForm.value).subscribe(
      res => {
        this.response = res;

        if (this.response["Status"] == "Success") {
          this.triggerEvent("Success");
          this.toastr.success(this.response["message"]);
          this.showSpinner = false;
          this.resetForm();
          this.activeModal.dismiss();
        }

        if (this.response["Status"] == "Failure") {
          this.toastr.warning(this.response["message"]);
          this.showSpinner = false;
        }
      },
      error => {
        for (let er of error.error.ErrorList) {
          this.toastr.warning(er);
        }
      }
    );
  }

  triggerEvent(status: string) {
    this.event.emit({ data: status, res: 200 });
  }
}
