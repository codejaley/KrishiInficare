import { Injectable } from "@angular/core";
import { Company, sno } from "./company.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { config } from "./../../../config";
@Injectable({
  providedIn: "root"
})
export class CompanyService {
  readonly rootURL = `${config.apiUrl}/api/Companies`;
  //readonly apiURL = `${config.apiUrl}`;

  constructor(private http: HttpClient) {}

  getCompanyList(): Observable<Company> {
    return this.http.get<Company>(this.rootURL + "/GetCompanies");
  }

  getCompanyDetail(agentCode): Observable<Company> {
    let params = new HttpParams();
    params = params.append("agentCode", agentCode);

    return this.http.get<Company>(this.rootURL + "/GetCompanyDetail", {
      params: params
    });
  }

  insertCompany(formData: Company) {
    return this.http.post<Company>(this.rootURL + "/AddCompany", formData);
  }

  updateCompany(formData: Company) {
    return this.http.post<Company>(this.rootURL + "/UpdateCompany", formData);
  }

  deleteCompany(sno: sno) {
    return this.http.post<any>(this.rootURL + "/DeleteCompany", sno);
  }

  lockCompany(sno: sno) {
    return this.http.post<any>(this.rootURL + "/LockCompany", sno);
  }

  // Clear Cache
  clearCache() {}
}
