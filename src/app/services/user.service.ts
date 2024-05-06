import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable } from 'rxjs/internal/Observable';
import { Login } from '../pages/models/Login';
import { Signup } from '../pages/models/Signup';
import { Events } from '../pages/models/Events';
import { Seats } from '../pages/models/seats';
import { Paymentinfo } from '../pages/models/paymentinfo';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginApi: string = 'http://localhost:8081/api/v1/login';
  signUpApi: string = 'http://localhost:8081/api/v1/customer';
  eventsApi: string = 'http://localhost:8081/api/v1/event';
  seatsByEventIdApi: string = 'http://localhost:8081/api/v1/seat/event'
  savePaymentInfoApi: string = 'http://localhost:8081/api/v1/'

  custumerId: number;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) {}

//login for a customer
  login(login:Login): Observable<Number>{
    return this.http.post<Number>(this.loginApi.concat('/verify'),login, {responseType: 'text' as 'json'});
  }

  //signup a customer returns customer id
  signup(signup:Signup): Observable<string>{
   return this.http.post<string>(this.signUpApi,signup,{responseType: 'text' as 'json'});
  }
   EventsList():Observable<Events[]>{
    return this.http.get<Events[]>(this.eventsApi, this.httpOptions);
   }

   seatList(eventId: number):Observable<Seats[]>{
    return this.http.get<Seats[]>(this.seatsByEventIdApi.concat("/").concat(eventId + ''), this.httpOptions)
   }

   newPaymentInfo(paymentinfo: Paymentinfo):Observable<string>{
    return this.http.post<string>(this.savePaymentInfo,paymentinfo,{responseType: 'text' as 'json'})
   }

}