import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-page1",
  templateUrl: "./page1.component.html",
  styleUrls: ["./page1.component.css"]
})
export class Page1Component implements OnInit {
  url = "http://mdxapitest.inficare.net/Account/GetCookie";
  url2 = "http://mdxapitest.inficare.net/Account/getEmployee";
  constructor(private http: HttpClient, private cookie: CookieService) {}

  ngOnInit(): void {}

  getCookie() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true,
      observe: "response" as "response"
    };
    const data = this.http.get<any>(this.url, httpOptions);

    data.subscribe((res: HttpResponse<any>) => {
      console.log("response from server:", res);
      console.log("response headers", res.headers.keys());
    });
  }

  getdata() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true,
      observe: "response" as "response"
    };
    const data = this.http.get<any>(this.url2, httpOptions);

    data.subscribe((res: HttpResponse<any>) => {
      console.log("response from server:", res);
    });
  }

  setCookie() {
    this.cookie.set("userName", "anjal");
  }

  removeCookie() {
    this.cookie.delete("userName");
  }

  allCookie() {
    console.log(this.cookie.getAll());
  }
}
