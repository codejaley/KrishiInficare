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

  //VendorCRUD

  getVendorlist(): Observable<Vendor> {
    return this.http.get<Vendor>(this.rootURL + "/GetVendors");
  }

  getVendorDetail(VendorId): Observable<Vendor> {
    let params = new HttpParams();
    params = params.append("Vendor_ID", VendorId);
    return this.http.get<Vendor>(this.rootURL + "/GetVendorDetail", {
      params: params
    });
  }

  updateVendor(formdata: Vendor) {
    return this.http.post<Vendor>(this.rootURL + "/EditVendor", formdata);
  }

  insertVendor(formdata: Vendor) {
    return this.http.post<Vendor>(this.rootURL + "/AddVendor", formdata);
  }

  deleteVendor(id: any) {
    return this.http.post<Vendor>(this.rootURL + "/DeleteVendor", id);
  }
}
