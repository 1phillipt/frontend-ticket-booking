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
  savePaymentInfoApi: string = 'http://localhost:8081/api/v1/paymentinfo'
  listOfPaymentInfo: string ='http://localhost:8081/api/v1/paymentinfo'
  deletePaymentInfo: string = 'http://localhost:8081/api/v1/paymentinfo'

  custumerId: number;
  seatsInCard: Seats[]= [];
  eventId: number;
  totalAmt: number;
  totalTickets:number;

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
    return this.http.post<string>(this.savePaymentInfoApi,paymentinfo,{responseType: 'text' as 'json'})
   }

   paymentInfos(customerId: number):Observable<Paymentinfo[]>{
    return this.http.get<Paymentinfo[]>(this.listOfPaymentInfo.concat("/").concat(customerId + ''), this.httpOptions)
   }
   deletePaymentInfoByCustomerIdCardnumber(customerId:number, cardNumber:string): Observable<string>{
    return this.http.delete<string>(this.deletePaymentInfo.concat('/').concat(customerId + '').concat('/').concat(cardNumber + ''), {responseType: 'text' as 'json'})
   }

}