import { Injectable } from "@angular/core";
import { Transaction } from "./transaction.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { config } from "./../../../config";

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  readonly rootURL = `${config.apiUrl}/api/Reports`;

  constructor(private http: HttpClient) {}

  gettransaction() {
    return this.http.get<Transaction>(this.rootURL + "/TransactionReport");
  }
}
