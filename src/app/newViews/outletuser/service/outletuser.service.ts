import { Injectable } from "@angular/core";
import { Outletuser, id } from "./outletuser.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { config } from "./../../../config";

@Injectable({
  providedIn: "root"
})
export class OutletUserService {
  readonly rootURL = `${config.apiUrl}/api/OutletUsers`;

  constructor(private http: HttpClient) {}

  getOutletUserList(id) {
    let params = new HttpParams();
    params = params.append("Outlet_ID", id);
    return this.http.get<Outletuser>(this.rootURL + "/GetOutletUsers", {
      params: params
    });
  }

  getOutletUserDetail(OutletUserId): Observable<Outletuser> {
    let params = new HttpParams();
    params = params.append("Outlet_User_ID", OutletUserId);
    return this.http.get<Outletuser>(this.rootURL + "/GetOutletDetails", {
      params: params
    });
  }

  updateOutletUser(formdata: Outletuser) {
    return this.http.post<Outletuser>(
      this.rootURL + "/EditOutletUser",
      formdata
    );
  }

  insertOutletUser(formdata: Outletuser) {
    return this.http.post<Outletuser>(
      this.rootURL + "/AddOutletUser",
      formdata
    );
  }

  deleteOutletUser(id: any) {
    return this.http.post<Outletuser>(this.rootURL + "/DeleteOutletUser", id);
  }
}
