import { Injectable } from "@angular/core";
import { Outlet } from "./outlet.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { config } from "./../../../config";

@Injectable({
  providedIn: "root"
})
export class OutletService {
  readonly rootURL = `${config.apiUrl}/api/Outlets`;

  constructor(private http: HttpClient) {}

  getOutletList(id) {
    let params = new HttpParams();
    params = params.append("Vendor_ID", id);
    return this.http.get<Outlet>(this.rootURL + "/GetOutlets", {
      params: params
    });
  }
}
