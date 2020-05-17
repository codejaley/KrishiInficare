import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import { MerchantService } from "./../services/merchant.service";
import { Merchant } from "./../services/merchant.model";

@Component({
  selector: "app-addmerchant",
  templateUrl: "./addmerchant.component.html",
  styleUrls: ["./addmerchant.component.css"]
})
export class AddmerchantComponent implements OnInit {
  addmerchantForm: FormGroup;
  myvar;
  formdata: Merchant[];
  response: any;
  isSubmitted = false;
  @Input() private agentCode;

  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: MerchantService,
    private toastr: ToastrService,

    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm() {
    this.addmerchantForm = this.formBuilder.group({
      agentCode: [this.agentCode],
      agent_branch_code: [null],
      Branch: [null, Validators.required],
      Address: [null, Validators.required],
      contactPerson: [null, Validators.required],
      email: [null, Validators.email],
      Telephone: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern("[0-9]*")
        ])
      ],
      Fax: [
        null,
        Validators.compose([
          Validators.minLength(12),
          Validators.pattern("[0-9]*")
        ])
      ],
      City: [null, Validators.required],

      Country: ["Nepal"]
    });
  }

  get f() {
    return this.addmerchantForm.controls;
  }

  addMerchant() {
    //this.activeModal.close(this.f);
    this.isSubmitted = true;
    if (this.addmerchantForm.invalid) {
      return;
    }
    console.log(this.addmerchantForm.value);
    this.service.insertMerchant(this.addmerchantForm.value).subscribe(
      res => {
        this.response = res;
        console.log(this.response);
        console.log(this.addmerchantForm.value);
        if (this.response["Status Code"] == 0) {
          this.triggerEvent("Success");
          this.toastr.success(this.response["Message"]);
          this.isSubmitted = false;
          this.resetForm();
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
