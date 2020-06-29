import { Injectable } from "@angular/core";
import {
  Customer,
  Acountchange,
  Phonechange,
  vnumber,
  AuditCustomer
} from "./customer.model";
import { Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";
import { config } from "./../../../config";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/auth/services/auth.service";
@Injectable({
  providedIn: "root"
})
export class CustomerService {
  readonly rootURL = `${config.apiUrl}/api/Customers`;
  constructor(private http: HttpClient, private auths: AuthService) {}

  //customerCRUD

  getCustomerlist(): Observable<Customer> {
    return this.http.get<Customer>(this.rootURL + "/GetCustomers");
  }

  getCustomerDetail(customerId): Observable<Customer> {
    let params = new HttpParams();
    params = params.append("Customer_ID", customerId);
    return this.http.get<Customer>(this.rootURL + "/GetCustomerDetails", {
      params: params
    });
  }
  getCustomerQr(customerId): Observable<Customer> {
    let params = new HttpParams();
    params = params.append("model.id", customerId);
    return this.http.get<Customer>(this.rootURL + "/GetCustomerQrCode", {
      params: params
    });
  }

  updateCustomer(formdata: Customer) {
    return this.http.post<Customer>(this.rootURL + "/EditCustomer", formdata);
  }

  insertCustomer(formdata: Customer) {
    return this.http.post<Customer>(this.rootURL + "/AddCustomer", formdata);
  }

  deleteCustomer(id: any) {
    return this.http.post<Customer>(this.rootURL + "/DeleteCustomer", id);
  }

  lockCustomer(id: any) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "x-my-header",
      this.specificCookie("access_payload", "anticsrf")
    );
    return this.http.post<Customer>(this.rootURL + "/LockCustomer", id, {
      headers: headers
    });
  }
  verify(id: any) {
    return this.http.post<any>(this.rootURL + "/VerifyCustomer", id);
  }
  VerifyAccount(acno: any) {
    return this.http.post<any>(this.rootURL + "/VerifyAccount", acno);
  }

  upload(file: FormData): Observable<Object> {
    return this.http.post(this.rootURL + "/ImageUplaod", file);
  }

  updatePhoneno(data: Phonechange) {
    return this.http.post<any>(this.rootURL + "/ChangePhone", data);
  }
  updateAccountnumber(data: Acountchange) {
    return this.http.post<any>(this.rootURL + "/ChangeAccount", data);
  }

  verifyMobilenumber(data: vnumber) {
    return this.http.post<any>(this.rootURL + "/VerifyMobileNumber", data);
  }

  getCustomerAudit(customerId): Observable<AuditCustomer> {
    let params = new HttpParams();
    params = params.append("Customer_ID", customerId);
    return this.http.get<AuditCustomer>(this.rootURL + "/GetCustomerAudits", {
      params: params
    });
  }

  private specificCookie(cname, tname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        var s = c.substring(name.length, c.length);
        var arr = s.split("&");
        var arr2 = arr[0].split("=");
        var arr3 = arr[1].split("=");
        if (tname == arr2[0]) {
          return arr2[1];
        } else if (tname == arr3[0]) {
          return arr3[1];
        } else {
          return "No Name value found";
        }
      }
    }
    return "";
  }
}
