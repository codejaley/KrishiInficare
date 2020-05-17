import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Company } from "../services/company.model";
import { CompanyService } from "../services/company.service";
import { ToastrService } from "ngx-toastr";
import { error } from "@angular/compiler/src/util";

@Component({
  selector: "app-updatecompany",
  templateUrl: "./updatecompany.component.html",
  styleUrls: ["./updatecompany.component.css"]
})
export class UpdatecompanyComponent implements OnInit {
  updatecompanyForm: FormGroup;
  myvar;
  data: any;
  response: any;
  isSubmitted = false;
  @Input() public updatedata;
  agentCode: string;

  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: CompanyService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.resetForm();
    this.getCompanyDetail((this.agentCode = this.updatedata[0]));
  }

  resetForm() {
    this.updatecompanyForm = this.formBuilder.group({
      agentCode: [null],
      companyname: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      phone1: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern("[0-9]*")
        ])
      ],
      fax: [
        null,
        Validators.compose([
          Validators.minLength(12),
          Validators.pattern("[0-9]*")
        ])
      ],
      email: [null, Validators.email],
      agent_short_code: [null],
      country: [null, Validators.required],
      phone2: [
        null,
        Validators.compose([
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern("[0-9]*")
        ])
      ]
    });
  }

  getCompanyDetail(agentCode: string) {
    this.service.getCompanyDetail(agentCode).subscribe(
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
    return this.updatecompanyForm.controls;
  }

  updateCompany() {
    this.isSubmitted = true;
    if (this.updatecompanyForm.invalid) {
      return;
    }
    this.service.updateCompany(this.updatecompanyForm.value).subscribe(
      res => {
        this.response = res;

        if (this.response["Status Code"] == 0) {
          this.triggerEvent("Success");
          this.toastr.success(this.response["Message"]);
          this.isSubmitted = false;
          this.resetForm();
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
