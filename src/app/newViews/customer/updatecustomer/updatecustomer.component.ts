import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  AfterViewInit
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerService } from "../services/customer.service";
import { ToastrService } from "ngx-toastr";
import { CategoriesService } from "../../categories/services/categories.service";
@Component({
  selector: "app-updatecustomer",
  templateUrl: "./updatecustomer.component.html",
  styleUrls: ["./updatecustomer.component.css"]
})
export class UpdatecustomerComponent implements OnInit {
  @Input() private customerid;
  editcustomerForm: FormGroup;
  showSpinner: boolean = false;
  public event: EventEmitter<any> = new EventEmitter();
  data: any;
  cats: any;
  response: any;
  categories: any;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private catservice: CategoriesService,
    private service: CustomerService,
    private toastr: ToastrService
  ) {
    this.resetForm();
  }

  ngOnInit(): void {
    this.customerid;
    this.toastr.clear();
    this.resetForm();
    this.getCustomerDetail(this.customerid);
    this.getcat();
  }

  ngAfterViewInit() {}

  getcat() {
    this.catservice.getCategorieslist().subscribe(data => {
      this.categories = data;
    });
  }

  resetForm() {
    this.editcustomerForm = this.formBuilder.group({
      Customer_ID: [this.customerid],
      Customer_Name: ["", Validators.required],
      Customer_Address: ["", Validators.required],
      Customer_City: ["", Validators.required],
      Customer_State: ["", Validators.required],
      Mobile_Number: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern("[0-9]*")
        ])
      ],

      Customer_Email_ID: ["", Validators.email],
      Loan_Approval_ID: ["", Validators.required],
      Bank_Branch_Code: ["", Validators.compose([Validators.required])],
      Bank_Account_Number: [
        null,
        Validators.compose([
          Validators.minLength(10),
          Validators.required,
          Validators.pattern("[0-9]*")
        ])
      ],

      Account_Verify_TS: null,
      Account_Verify_Status: null,
      Categories: null,
      Enable_Disable_FG: [null]
    });
  }

  getCustomerDetail(id: string) {
    this.service.getCustomerDetail(id).subscribe(
      res => {
        this.data = res["result"];
        this.cats = res["categories"];
        console.log(this.cats);
      },
      error => {
        console.log(error);
      }
    );
  }

  get f() {
    return this.editcustomerForm.controls;
  }
  updateCustomer() {
    console.log(this.editcustomerForm.value);

    if (this.editcustomerForm.invalid) {
      return;
    }

    this.service.updateCustomer(this.editcustomerForm.value).subscribe(
      res => {
        this.response = res;
        console.log(this.response);

        if (this.response["Status"] == "Success") {
          this.triggerEvent("Success");
          this.resetForm();
          this.activeModal.dismiss();
          this.toastr.success(this.response["message"]);
        }
        if (this.response["Status"] == "Failure") {
          this.toastr.warning(this.response["Message"]);
        }
      },
      error => {
        for (let er of error.error.ErrorList) {
          this.toastr.warning(error.error.Message, er);
        }
        console.log(error);
      }
    );
  }

  triggerEvent(status: string) {
    this.event.emit({ data: status, res: 200 });
  }
}
