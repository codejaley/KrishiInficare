import { Injectable } from "@angular/core";
import { User, password, sno, menuprivilege } from "./user.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { config } from "./../../../config";

@Injectable({
  providedIn: "root"
})
export class UserService {
  readonly rootURL = `${config.apiUrl}/api/Accounts`;
  readonly userURl = `${config.apiUrl}/api/Users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User> {
    return this.http.get<User>(this.userURl + "/GetUsers");
  }

  getUsersDetail(userLoginId): Observable<User> {
    let params = new HttpParams();
    params = params.append("userLoginId", userLoginId);
    return this.http.get<User>(this.userURl + "/GetUserDetail", {
      params: params
    });
  }

  updateUser(formdata: User) {
    return this.http.post<User>(this.userURl + "/EditUser", formdata);
  }

  updatePassword(formData: password) {
    return this.http.post<password>(this.rootURL + "/ChangePassword", formData);
  }
  insertUser(formdata: User) {
    return this.http.post<User>(this.userURl + "/AddUser", formdata);
  }

  deleteUser(data: sno) {
    return this.http.post<sno>(this.userURl + "/DeleteUser", data);
  }

  lockUser(data: sno) {
    return this.http.post<sno>(this.userURl + "/LockUser", data);
  }

  getUsermenuPrvildg(userLoginId): Observable<any> {
    let params = new HttpParams();
    params = params.append("userLoginId", userLoginId);
    return this.http.get<any>(this.userURl + "/GetUserMenuPrivileges", {
      params: params
    });
  }

  editUsermenuPrvildg(formdata: menuprivilege) {
    return this.http.post<menuprivilege>(
      this.userURl + "/EditUserPriviliges",
      formdata
    );
  }
}
