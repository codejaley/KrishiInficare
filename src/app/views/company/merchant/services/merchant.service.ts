import { Injectable } from "@angular/core";
import { Merchant, sno } from "./merchant.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { config } from "./../../../../config";

@Injectable({
  providedIn: "root"
})
export class MerchantService {
  readonly rootURL = `${config.apiUrl}/api/Companies`;

  constructor(private http: HttpClient) {}

  getMerchantList(agentCode: string): Observable<Merchant> {
    let params = new HttpParams();
    params = params.append("agentCode", agentCode);

    return this.http.get<Merchant>(this.rootURL + "/GetCompanyBranchList", {
      params: params
    });
  }

  getMerchantDetail(agentBranchCode: string): Observable<Merchant> {
    let params = new HttpParams();
    params = params.append("agentBranchCode", agentBranchCode);

    return this.http.get<Merchant>(this.rootURL + "/GetCompanyBranchDetail", {
      params: params
    });
  }

  insertMerchant(formData: Merchant) {
    return this.http.post<Merchant>(
      this.rootURL + "/AddCompanyBranchDetail",
      formData
    );
  }

  deleteMerchant(sno: sno) {
    return this.http.post<any>(this.rootURL + "/DeleteCompanyBranch", sno);
  }

  updateMerchant(formData: Merchant) {
    return this.http.post<Merchant>(
      this.rootURL + "/EditCompanyBranch",
      formData
    );
  }

  lockMerchant(sno: sno) {
    return this.http.post<any>(this.rootURL + "/LockCompanyBranch", sno);
  }
}
