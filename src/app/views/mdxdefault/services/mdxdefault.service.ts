import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MDXDefault } from "../services/mdxdefault.model";
import { config } from "./../../../config";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class MDXDefaultService {
  formdata: MDXDefault;
  readonly rootURL = `${config.apiUrl}/api/MdxDefaults`;
  constructor(private http: HttpClient) {}

  getMDXdefaultdata(): Observable<MDXDefault> {
    return this.http.get<MDXDefault>(this.rootURL + "/GetMdxDefaults");
  }

  updateMDXdefaultdata(formdata: MDXDefault) {
    return this.http.post<MDXDefault>(
      this.rootURL + "/UpdateMdxDefaults",
      formdata
    );
  }
}
