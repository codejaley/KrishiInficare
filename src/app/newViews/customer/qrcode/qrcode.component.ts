import { Component, OnInit, Input } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { CustomerService } from "./../services/customer.service";
declare var $;
@Component({
  selector: "app-qrcode",
  templateUrl: "./qrcode.component.html",
  styleUrls: ["./qrcode.component.css"]
})
export class QrcodeComponent implements OnInit {
  @Input()
  myAngularxQrCode;

  @Input()
  name;

  href: string;
  id;
  qrdata;
  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private service: CustomerService
  ) {
    this.myAngularxQrCode;
  }

  ngOnInit(): void {
    console.log(this.myAngularxQrCode);
    this.id = this.myAngularxQrCode;
    this.getQRcode(this.id);
    this.toastr.info("Generating QR Code", "", {
      timeOut: 500
    });
  }

  getQRcode(id) {
    this.service.getCustomerQr(id).subscribe(data => {
      this.qrdata = data;
      console.log(this.qrdata);
    });
  }

  downloadImage() {
    this.href = $("qrcode img").attr("src");
    var a = document.createElement("a"); //Create <a>
    a.href = this.href; //Image Base64 Goes here
    var n = Math.floor(Math.random() * 10000) + 1;
    a.download = n + ".png"; //File name Here
    a.click(); //Downloaded file
    this.toastr.success("Download Succesfull");
    this.activeModal.close();
  }

  printImage() {
    this.href = $("qrcode img").attr("src");
    var win = window.open("about:blank", "_new");
    win.document.open();
    win.document.write(
      [
        "<html>",
        "   <head>",
        "   </head>",
        '   <body onload="window.print()" onafterprint="window.close()" style="width:300px;height:300px">',
        '       <img src="' + this.href + '"/>',
        "<p>" + this.name + "</p>",
        "   </body>",
        "</html>"
      ].join("")
    );
    win.document.close();
  }
}
