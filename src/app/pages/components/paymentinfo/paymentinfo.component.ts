import { Component, OnInit, Input, input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import {RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Login } from '../../models/Login';
import { LoginComponent } from '../login/login.component';
import { Paymentinfo } from '../../models/paymentinfo';
import { CommonModule } from '@angular/common';
import { Seats } from '../../models/seats';
import { Ticket } from '../../models/ticket';
import { Confirmation } from '../../models/confirmation';


@Component({
  selector: 'app-paymentinfo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterModule, CommonModule],
  templateUrl: './paymentinfo.component.html',
  styleUrl: './paymentinfo.component.scss'
})
export class PaymentinfoComponent implements OnInit{

paymentinfoGroup: FormGroup;
cId:number;
eventId:number;
totalAmount: number;
totalTickets: number;
paymentInfoId: number;
ticketId: number;

allCardsByCustomer: Paymentinfo[] = []

seatsInCard: Seats[]= [];
customerTickets:Ticket [] = [];

seatNumber: string;






constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.cId =this.userService.customerId;
    this.eventId = this.userService.eventId;
    this.totalAmount = this.userService.totalAmt;
    this.totalTickets =this.userService.totalTickets;

   

    this.paymentinfoGroup =this.formBuilder.group({
    cardNumber: ['' ,Validators.required],
    paymentType: ['',Validators.required],
    customerId:this.userService.customerId
    })
    this.paymentInfo(this.cId)
    this.seatsInCard = this.userService.seatsInCard;
     }
  
  savePaymentInfo():void{
 
    this.userService.newPaymentInfo(this.paymentinfoGroup.value).subscribe((result:String) =>
      {
        if(result === "payment info saved"){
          this.allCardsByCustomer.push(this.paymentinfoGroup.value)
          alert("payment saved")
        } else{
            alert("payment info already exist")
        }
      })
      this.paymentInfo(this.cId);
  }

  paymentInfo(customerId):void{
    this.userService.paymentInfos(customerId).subscribe((listOfcardsBycustomer: Paymentinfo[])=> this.allCardsByCustomer = listOfcardsBycustomer);
    
  }

  deletePaymentMethod(customerId:number, cardNumber: string):void{ 
    

    this.userService.deletePaymentInfoByCustomerIdCardnumber(customerId, cardNumber).subscribe((result:string)=>
      
     this.allCardsByCustomer.splice(this.allCardsByCustomer.findIndex(paymentInfo => paymentInfo.cardNumber = cardNumber),1)
      )
      this.paymentInfo(customerId);
    }

    async saveTicket(paymentInfoId: number): Promise<void> {
      this.paymentInfoId = paymentInfoId;
      
    
      for (const seat of this.seatsInCard) {
        this.userService.seatNumber.push(seat.seatNumber)
        const ticket = {
          customerId: this.userService.customerId,
          eventId: this.eventId, 
          paymentInfoId: this.paymentInfoId,
          seatNumber: seat.seatNumber
          
        };
        this.userService.customerTickets.push(ticket);
        await this.userService.saveCustomerTicket(ticket).toPromise();
        
       // this.userService.saveConfirmation();
      }
      await this.getTicketByEventIdAndseatNumber()
    }
    async getTicketByEventIdAndseatNumber(): Promise<void> {
      for (const seat of this.seatsInCard) {
        this.seatNumber = seat.seatNumber
       
        try {
          const customerTicket = await this.userService.getTicketInfoByEventIdAndseatNumber(this.eventId,this.seatNumber).toPromise();
     
          this.customerTickets.push(customerTicket);
          this.userService.customerTicket.push(customerTicket);
          console.log(this.userService.customerTicket)

        } catch (error) {
          console.error('Error fetching ticket:', error);
        }

      }
      
    }
    
 
    
    
}



