import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Company } from "../services/company.model";
import { CompanyService } from "../services/company.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-company",
  templateUrl: "./add-company.component.html",
  styleUrls: ["./add-company.component.css"]
})
export class AddCompanyComponent implements OnInit {
  addcompanyForm: FormGroup;
  myvar;
  formdata: Company[];
  response: any;
  isSubmitted = false;
  @Input() public user;

  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: CompanyService,
    private toastr: ToastrService,

    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm() {
    this.addcompanyForm = this.formBuilder.group({
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

  get f() {
    return this.addcompanyForm.controls;
  }

  addCompany() {
    //this.activeModal.close(this.f);
    this.isSubmitted = true;
    if (this.addcompanyForm.invalid) {
      return;
    }
    this.service.insertCompany(this.addcompanyForm.value).subscribe(
      res => {
        this.response = res;
        console.log(this.response);
        console.log(this.addcompanyForm.value);
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

  // reloadPage() {
  //   // click handler or similar
  //   this.zone.runOutsideAngular(() => {
  //     location.reload();
  //   });
  // }
}
