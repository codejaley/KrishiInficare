import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { MDXDefaultService } from "./services/mdxdefault.service";
import { ToastrService } from "ngx-toastr";
import { NgForOf } from "@angular/common";
@Component({
  selector: "app-mdxdefault",
  templateUrl: "./mdxdefault.component.html",
  styleUrls: ["./mdxdefault.component.css"]
})
export class MDXDefaultComponent implements OnInit {
  title = "MDXDefault";
  mdxDefaultForm: FormGroup;
  mdxDefaultdata: any;
  response: any;
  showForm: boolean = false;
  showSpinner: boolean = true;
  constructor(
    private dataservice: MDXDefaultService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.resetForm();

    this.getMDXdefault();
  }

  resetForm() {
    this.mdxDefaultForm = this.formBuilder.group({
      sno: [null],
      backup_location: [""],
      ISO_32_INSTITUTION_IDENTIFICATION_CODE: [""],
      ISO_41_TERMINAL_IDENTIFICATION: [""],
      ISO_42_IDENTIFICATION_CODE: [""],
      ISO_43_NAMELOCATION: [""],
      ACCOUNT_MAX_CHAR: [""],
      BRANCH_CODE_MAX_CHAR: [""],
      MAX_AMOUNT_DEPOSIT_PER_DAY: [""],
      MAX_AMOUNT_WITHDRAW_PER_DAY: [""],
      MAX_AMOUNT_DEPOSIT_PER_TRANSACTION: [""],
      MIN_AMOUNT_DEPOSIT_PER_TRANSACTION: [""],
      MAX_AMOUNT_WITHDRAW_PER_TRANSACTION: [""],
      MIN_AMOUNT_WITHDRAW_PER_TRANSACTION: [""],
      MAX_QUERIES_AGAINST_PARTICULAR_ACCOUNT: [""],
      MAX_OTP_RESEND_PER_TRANSACTION: [""],
      OTP_RESEND_INTERVAL_TIME: [""],
      SERVICE_CHARGE_PER_TRANSACTION: [""],
      SERVICE_CHARGE_MONTHLY: [""],
      SERVICE_CHARGE_YEARLY: [""]
    });
  }

  get f() {
    return this.mdxDefaultForm.controls;
  }

  getMDXdefault() {
    this.dataservice.getMDXdefaultdata().subscribe(data => {
      this.mdxDefaultdata = data;
      this.showSpinner = false;
      this.showForm = true;
    });
  }
  updateMDXdefault() {
    this.dataservice.updateMDXdefaultdata(this.mdxDefaultForm.value).subscribe(
      res => {
        this.response = res;
        if (this.response["Status Code"] == 0) {
          this.toastr.success(this.response["Message"]);
          this.resetForm();
          this.getMDXdefault();
        }
        if (this.response["Status Code"] == 4000) {
          this.toastr.warning(this.response["Message"]);
        }
      },
      error => {
        console.log(error);
        if (error.error.ErrorList) {
          for (let er of error.error.ErrorList) {
            this.toastr.warning(error.error.Message, er);
          }
        } else {
          this.toastr.warning(error.error.Message);
        }

        console.log(error);
      }
    );
  }
}
