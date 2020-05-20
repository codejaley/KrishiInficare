import { Component, OnInit, Input } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-qrcode",
  templateUrl: "./qrcode.component.html",
  styleUrls: ["./qrcode.component.css"]
})
export class QrcodeComponent implements OnInit {
  @Input()
  myAngularxQrCode;

  href: string;

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {
    this.myAngularxQrCode;
  }

  ngOnInit(): void {
    this.toastr.info("Generating QR Code", "", {
      timeOut: 500
    });
  }

  downloadImage() {
    this.href = document.getElementsByTagName("img")[5].src;
    var a = document.createElement("a"); //Create <a>
    a.href = this.href; //Image Base64 Goes here
    var n = Math.floor(Math.random());
    a.download = this.myAngularxQrCode + n + ".png"; //File name Here
    a.click(); //Downloaded file
    this.toastr.success("Download Succesfull");
    this.activeModal.close();
  }

  printImage() {
    this.href = document.getElementsByTagName("img")[5].src;
    var win = window.open("about:blank", "_new");
    win.document.open();
    win.document.write(
      [
        "<html>",
        "   <head>",
        "   </head>",
        '   <body onload="window.print()" onafterprint="window.close()" style="width:300px;height:300px">',
        '       <img src="' + this.href + '"/>',
        "   </body>",
        "</html>"
      ].join("")
    );
    win.document.close();
  }
}
