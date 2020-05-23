import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Categories } from "../services/categories.model";
import { CategoriesService } from "../services/categories.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-updatecategories",
  templateUrl: "./updatecategories.component.html",
  styleUrls: ["./updatecategories.component.css"]
})
export class UpdatecategoriesComponent implements OnInit {
  @Input() private catID;

  editcategoriesForm: FormGroup;

  data: Categories;
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
    this.catID;
    this.getCatDetail(this.catID);
    this.resetForm();
  }

  resetForm() {
    this.editcategoriesForm = this.formBuilder.group({
      Category_ID: [this.catID],
      Category_Name: [null, Validators.required],
      Category_Description: [null, Validators.required]
    });
  }

  get f() {
    return this.editcategoriesForm.controls;
  }

  getCatDetail(id: string) {
    this.service.getCategoriesDetail(id).subscribe(
      res => {
        this.data = res;

        console.log(this.data);
      },
      error => {
        console.log(error);
      }
    );
  }

  editCategory() {
    //this.activeModal.close(this.f);
    this.showSpinner = true;
    if (this.editcategoriesForm.invalid) {
      return;
    }
    this.service.updateCategory(this.editcategoriesForm.value).subscribe(
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
