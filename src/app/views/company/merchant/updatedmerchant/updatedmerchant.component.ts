import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Merchant } from "../services/merchant.model";
import { MerchantService } from "../services/merchant.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-updatedmerchant",
  templateUrl: "./updatedmerchant.component.html",
  styleUrls: ["./updatedmerchant.component.css"]
})
export class UpdatedmerchantComponent implements OnInit {
  updatemerchantForm: FormGroup;
  myvar;
  data: any;
  response: any;
  isSubmitted = false;
  @Input() private agentBranchCode;
  @Input() private agentCode;

  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: MerchantService,
    private toastr: ToastrService,
    private dataRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resetForm();
    this.getMerchantDetail(this.agentBranchCode);
  }

  resetForm() {
    this.updatemerchantForm = this.formBuilder.group({
      agentCode: [this.agentCode],
      agent_branch_code: [this.agentBranchCode],
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

  getMerchantDetail(agentBranchCode: string) {
    this.service.getMerchantDetail(agentBranchCode).subscribe(
      res => {
        this.data = res;
        console.log(this.data);
      },
      error => {
        console.log(error);
      }
    );
  }

  get f() {
    return this.updatemerchantForm.controls;
  }

  updateMerchant() {
    console.log(this.updatemerchantForm.value);
    this.isSubmitted = true;
    if (this.updatemerchantForm.invalid) {
      return;
    }
    this.service.updateMerchant(this.updatemerchantForm.value).subscribe(
      res => {
        this.response = res;
        console.log(this.response);
        console.log(this.updatemerchantForm.value);
        if (this.response["Status Code"] == 0) {
          this.triggerEvent("Success");
          this.toastr.success(this.response["Message"]);
          this.isSubmitted = false;
        }
      },
      error => {
        for (let er of error.error.ErrorList) {
          this.toastr.warning(error.error.Message, er);
        }
        console.log(error.error.ErrorList);
      }
    );
  }

  triggerEvent(status: string) {
    this.event.emit({ data: status, res: 200 });
  }
}
