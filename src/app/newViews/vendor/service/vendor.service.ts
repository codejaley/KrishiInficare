import { Injectable } from "@angular/core";
import { Vendor } from "./vendor.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { config } from "./../../../config";

@Injectable({
  providedIn: "root"
})
export class VendorService {
  readonly rootURL = `${config.apiUrl}/api/Vendors`;
  constructor(private http: HttpClient) {}

  //customerCRUD

  getVendorlist(): Observable<Vendor> {
    return this.http.get<Vendor>(this.rootURL + "/GetVendors");
  }
}
