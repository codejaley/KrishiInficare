import { Injectable } from "@angular/core";
import { Outlet, id, AuditOutlet } from "./outlet.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { config } from "./../../../config";

@Injectable({
  providedIn: "root"
})
export class OutletService {
  readonly rootURL = `${config.apiUrl}/api/Outlets`;
  readonly categoryURL = `${config.apiUrl}/api/Static`;

  constructor(private http: HttpClient) {}

  getCategoryList(): Observable<any> {
    return this.http.get<any>(this.categoryURL + "/GetCategories");
  }

  getOutletList(id) {
    let params = new HttpParams();
    params = params.append("Vendor_ID", id);
    return this.http.get<Outlet>(this.rootURL + "/GetOutlets", {
      params: params
    });
  }

  VerifyAccount(acno: any) {
    return this.http.post<any>(this.rootURL + "/VerifyAccount", acno);
  }

  updateAccountnumber(data: any) {
    return this.http.post<any>(this.rootURL + "/ChangeAccount", data);
  }

  getOutletDetail(OutletId): Observable<Outlet> {
    let params = new HttpParams();
    params = params.append("Outlet_ID", OutletId);
    return this.http.get<Outlet>(this.rootURL + "/GetOutletDetails", {
      params: params
    });
  }

  updateOutlet(formdata: Outlet) {
    return this.http.post<Outlet>(this.rootURL + "/EditOutlet", formdata);
  }

  insertOutlet(formdata: Outlet) {
    return this.http.post<Outlet>(this.rootURL + "/AddOutlet", formdata);
  }

  deleteOutlet(id: any) {
    return this.http.post<id>(this.rootURL + "/DeleteOutlet", id);
  }

  lockOutlet(id: any) {
    return this.http.post<id>(this.rootURL + "/LockOutlet", id);
  }

  getOutletAudit(outletId): Observable<AuditOutlet> {
    let params = new HttpParams();
    params = params.append("Outlet_ID", outletId);
    return this.http.get<AuditOutlet>(this.rootURL + "/GetOutletAudits", {
      params: params
    });
  }
}
