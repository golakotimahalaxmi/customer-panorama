import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IntentService {

  constructor(private http:HttpClient) { }
  getIntentData():Observable<any>
  {
    return this.http.get<any>("assets/data/intent-signal.json");
  }
}
