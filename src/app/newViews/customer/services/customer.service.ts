import { Injectable } from "@angular/core";
import { Customer } from "./customer.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { config } from "./../../../config";
@Injectable({
  providedIn: "root"
})
export class CustomerService {
  readonly rootURL = `${config.apiUrl}/api/Customers`;
  constructor(private http: HttpClient) {}

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

  updateCustomer(formdata: Customer) {
    return this.http.post<Customer>(this.rootURL + "/EditCustomer", formdata);
  }

  insertCustomer(formdata: Customer) {
    return this.http.post<Customer>(this.rootURL + "/AddCustomer", formdata);
  }

  deleteCustomer(id: any) {
    return this.http.post<Customer>(this.rootURL + "/DeleteCustomer", id);
  }
}
