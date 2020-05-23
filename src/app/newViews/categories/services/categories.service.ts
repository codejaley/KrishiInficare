import { Injectable } from "@angular/core";
import { Categories, id } from "./categories.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { config } from "./../../../config";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  readonly rootURL = `${config.apiUrl}/api/Static`;
  constructor(private http: HttpClient) {}

  //CategoriesCRUD

  getCategorieslist(): Observable<Categories> {
    return this.http.get<Categories>(this.rootURL + "/GetCategories");
  }

  getCategoriesDetail(CategoryId): Observable<Categories> {
    let params = new HttpParams();
    params = params.append("Category_ID", CategoryId);
    return this.http.get<Categories>(this.rootURL + "/GetCategoryDetail", {
      params: params
    });
  }

  updateCategory(formdata: Categories) {
    return this.http.post<Categories>(this.rootURL + "/EditCategory", formdata);
  }

  insertCategory(formdata: Categories) {
    return this.http.post<Categories>(this.rootURL + "/AddCategory", formdata);
  }

  deleteCategory(id: id) {
    return this.http.post<Categories>(this.rootURL + "/DeleteCategory", id);
  }

  lockCategory(id: id) {
    return this.http.post<Categories>(this.rootURL + "/LockCategory", id);
  }
}
