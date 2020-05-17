import { Injectable } from "@angular/core";
import { Activity } from "./activity.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { config } from "./../../../config";

@Injectable({
  providedIn: "root"
})
export class ActivityService {
  readonly rootURL = `${config.apiUrl}/api/Activities`;
  //readonly apiURL = `${config.apiUrl}`;

  constructor(private http: HttpClient) {}

  getActivitytypeList(): Observable<Activity> {
    return this.http.get<Activity>(this.rootURL + "/GetActivitiesTypes");
  }

  // Clear Cache
  clearCache() {}
}
