import { Component, OnInit, Input } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-qrcode",
  templateUrl: "./qrcode.component.html",
  styleUrls: ["./qrcode.component.css"]
})
export class QrcodeComponent implements OnInit {
  @Input()
  myAngularxQrCode;

  href: string;

  constructor(public activeModal: NgbActiveModal) {
    this.myAngularxQrCode;
  }

  ngOnInit(): void {}

  downloadImage() {
    this.href = document.getElementsByTagName("img")[5].src;
    alert(this.href);
  }
}
