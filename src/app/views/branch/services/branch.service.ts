import { Injectable } from "@angular/core";
import { Branch } from "./branch.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { config } from "./../../../config";

@Injectable({
  providedIn: "root"
})
export class BranchService {
  readonly rootURL = `${config.apiUrl}/api/Branches`;
  constructor(private http: HttpClient) {}

  getBranchList(): Observable<Branch> {
    return this.http.get<Branch>(this.rootURL + "/GetBranches");
  }
}
