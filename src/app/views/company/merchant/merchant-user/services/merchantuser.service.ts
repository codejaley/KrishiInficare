import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Merchantuser, sno, dmu } from "./merchantuser.model";
import { Observable } from "rxjs";
import { config } from "./../../../../../config";
import { formatDate } from "@angular/common";
@Injectable({
  providedIn: "root"
})
export class MerchantuserService {
  readonly rootURL = `${config.apiUrl}/api/Merchants`;
  constructor(private http: HttpClient) {}

  getMerchantUserList(agentBranchCode): Observable<Merchantuser> {
    let params = new HttpParams();
    params = params.append("agentBranchCode", agentBranchCode);
    return this.http.get<Merchantuser>(this.rootURL + "/GetMerchants", {
      params: params
    });
  }

  getMerchantUserDetail(agentUserId: string): Observable<Merchantuser> {
    let params = new HttpParams();
    params = params.append("agentUserId", agentUserId);

    return this.http.get<Merchantuser>(this.rootURL + "/GetMerchantDetail", {
      params: params
    });
  }

  updateMerchantUser(formdata: Merchantuser) {
    return this.http.post<Merchantuser>(
      this.rootURL + "/EditMerchant",
      formdata
    );
  }

  insertMerchantUser(formdata: Merchantuser) {
    return this.http.post<Merchantuser>(
      this.rootURL + "/AddMerchant",
      formdata
    );
  }
  deleteMerchantuser(sno: sno) {
    return this.http.post<any>(this.rootURL + "/DeleteMerchant", sno);
  }

  lockMerchantUser(model: dmu) {
    return this.http.post<any>(this.rootURL + "/LockMerchant", model);
  }

  searchMerchantUser(name: string): Observable<Merchantuser> {
    console.log(`calling api with %c${name}`, "font-wight : bold");
    let params = new HttpParams();
    params = params.append("name", name);

    return this.http.get<Merchantuser>(this.rootURL + "/SearchMerchant", {
      params: params
    });
  }

  getLockedMerchantUser(): Observable<any> {
    return this.http.get<any>(this.rootURL + "/GetLockedMerchants");
  }
}
