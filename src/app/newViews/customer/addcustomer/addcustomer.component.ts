import { Component, OnInit, NgZone, Input, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
declare var $;
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Customer } from "../services/customer.model";
import { CustomerService } from "../services/customer.service";
import { CategoriesService } from "../../categories/services/categories.service";
import { ToastrService } from "ngx-toastr";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-addcustomer",
  templateUrl: "./addcustomer.component.html",
  styleUrls: ["./addcustomer.component.css"]
})
export class AddcustomerComponent implements OnInit {
  states: string[] = [
    "Bhojpur",
    "Dhankuta",
    "Ilam",
    "Jhapa",
    "Khotang",
    "Morang",
    "Okhaldhunga",
    "Panchthar",
    "Sankhuwasabha",
    "Solukhumbu",
    "Sunsari",
    "Taplejung",
    "Terhathum",
    "Udayapur",

    "Bara",
    "Parsa",
    "Dhanusha",
    "Mahottari",
    "Rautahat",
    "Saptari",
    "Sarlahi",
    "Siraha",

    "Bhaktapur",
    "Chitwan",
    "Dhading",
    "Dolakha",
    "Kathmandu",
    "Kavrepalanchok",
    "Lalitpur",
    "Makwanpur",
    "Nuwakot",
    "Ramechhap",
    "Rasuwa",
    "Sindhuli",
    "Sindhupalchok",

    "Baglung",
    "Gorkha",
    "Kaski",
    "Lamjung",
    "Manang",
    "Mustang",
    "Myagdi",
    "Nawalpur",
    "Parbat",
    "Syangja",
    "Tanahun",

    "Arghakhanchi",
    "Banke",
    "Bardiya",
    "Dang",
    "Eastern Rukum",
    "Gulmi",
    "Kapilavastu",
    "Parasi",
    "Palpa",
    "Pyuthan",
    "Rolpa",
    "Rupandehi",

    "Dailekh",
    "Dolpa",
    "Humla",
    "Jajarkot",
    "Jumla",
    "Kalikot",
    "Mugu",
    "Salyan",
    "Surkhet",
    "Western Rukum",

    "Achham",
    "Baitadi",
    "Bajhang",
    "Bajura",
    "Dadeldhura",
    "Darchula",
    "Doti",
    "Kailali",
    "Kanchanpur"
  ];
  active;
  selectedFile: File;

  isDisabled: boolean = false;
  isDisabled2: boolean = true;
  isDisabled3: boolean = true;
  uploadDisabled: boolean = true;
  addcustomerForm: FormGroup;

  showSpinner: boolean = false;
  response: any;
  isSubmitted: boolean = false;

  accountVerified: boolean = false;
  categories: any;

  VerifyAccountForm: FormGroup;
  responseVerify: any;

  imageForm: FormGroup;
  isUploading: boolean = false;
  isUploaded: boolean = false;

  imgPath: string;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: CustomerService,
    private catservice: CategoriesService,
    private toastr: ToastrService,

    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.resetVerifyAccountForm();
    this.resetForm();
    this.getcat();
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.activeId === 2) {
      this.uploadDisabled = true;
    }
  }
  resetForm() {
    this.addcustomerForm = this.formBuilder.group({
      Customer_Name: [null, Validators.required],
      Customer_Address: [null, Validators.required],
      Customer_City: [null, Validators.required],
      Customer_State: [null, Validators.required],
      Mobile_Number: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),

          Validators.pattern("[0-9]*")
        ])
      ],

      Customer_Email_ID: [null, Validators.email],
      Loan_Approval_ID: [null],
      Bank_Branch_Code: [null, Validators.compose([Validators.required])],
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
      Image_Name: [null, Validators.required],
      Enable_Disable_FG: ["n"]
    });
  }

  resetVerifyAccountForm() {
    this.VerifyAccountForm = this.formBuilder.group({
      account_number: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),

          Validators.pattern("[0-9]*")
        ])
      ]
    });
  }

  get f() {
    return this.addcustomerForm.controls;
  }

  get f2() {
    return this.VerifyAccountForm.controls;
  }

  getcat() {
    this.catservice.getCategorieslist().subscribe(data => {
      this.categories = data;
    });
  }

  addCustomer() {
    //this.activeModal.close(this.f);

    if (this.addcustomerForm.invalid) {
      return;
    }

    this.service.insertCustomer(this.addcustomerForm.value).subscribe(
      res => {
        this.response = res;

        if (this.response["Status"] == "Success") {
          this.triggerEvent("Success");
          this.resetForm();
          this.toastr.success(this.response["message"]);
          this.showSpinner = false;

          this.activeModal.dismiss();
        }

        if (this.response["Status"] == "Failure") {
          this.toastr.warning(this.response["message"]);
        }
      },
      error => {
        for (let er of error.error.ErrorList) {
          this.toastr.warning(er);
        }
      }
    );
  }

  verifyAccountno() {
    this.toastr.info("Verifying Please Wait", "", {
      timeOut: 20000
    });
    var name = this.f2.account_number.value;
    console.log(name);
    this.service.VerifyAccount(this.VerifyAccountForm.value).subscribe(res => {
      this.responseVerify = res;
      console.log(this.responseVerify);
      if (this.responseVerify["Status"] == "SUCCESS") {
        this.f.Bank_Account_Number.setValue(name);
        this.accountVerified = true;
        this.isDisabled = true;
        this.isDisabled2 = false;
        this.toastr.clear();
        this.toastr.success(this.responseVerify["Message"], "", {
          timeOut: 1000
        });
      }
      if (
        this.responseVerify["Status"] == "FAILURE" ||
        this.responseVerify["Status"] == "Failure"
      ) {
        this.toastr.clear();
        this.accountVerified = false;
        this.isDisabled = true;
        this.toastr.warning(this.responseVerify["Message"]);
      }
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile != null || this.selectedFile !== undefined) {
      this.uploadDisabled = false;

      var reader = new FileReader();

      reader.onload = function(e) {
        $("#output").attr("src", e.target.result);
        $("#output").attr("width", 200);
        $("#output").attr("height", 200);
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  onUpload() {
    if (this.selectedFile !== null) {
      this.isUploaded = false;
      this.isUploading = true;
      this.toastr.info("Uploading File Please Wait", "", {
        timeOut: 30000
      });
      // this.http is the injected HttpClient
      const uploadData = new FormData();
      uploadData.append("myFile", this.selectedFile, this.selectedFile.name);
      this.service.upload(uploadData).subscribe(
        res => {
          this.response = res;
          if ((this.response["Status"] = "Success")) {
            this.imgPath = this.response["Link"];
            this.f.Image_Name.setValue(this.imgPath);
            this.isDisabled2 = true;
            this.isDisabled3 = false;
            this.isUploading = false;
            this.isUploaded = true;
            this.toastr.clear();
            this.toastr.success("Successfully Uploaded");
          }
        },
        error => {
          this.isDisabled2 = false;
          this.isDisabled3 = true;
          this.isUploading = false;
          this.isUploaded = false;
          this.toastr.clear();
          $("#output").attr("src", null);
          $("#control").val(null);
          this.uploadDisabled = true;
          this.toastr.warning(error.error.Message);
        }
      );
    } else {
      this.toastr.warning("No File Selected");
    }
  }

  removeImg(event) {
    $("#output").attr("src", null);
    $("#control").val(null);
    this.uploadDisabled = true;
    this.isUploading = false;
    this.isUploaded = false;
    this.selectedFile = null;
  }

  triggerEvent(status: string) {
    this.event.emit({ data: status, res: 200 });
  }

  // Initially fill the selectedStates so it can be used in the for loop**
  selectedStates = this.states;

  // Receive user input and send to search method**
  onKey(value) {
    this.selectedStates = this.search(value);
  }

  // Filter the states list and send back to populate the selectedStates**
  search(value: string) {
    let filter = value.toLowerCase();
    return this.states.filter(option =>
      option.toLowerCase().startsWith(filter)
    );
  }
}
