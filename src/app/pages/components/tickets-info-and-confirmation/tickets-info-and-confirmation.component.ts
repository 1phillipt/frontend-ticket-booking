import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Seats } from '../../models/seats';
import { UserService } from '../../../services/user.service';
import { Ticket } from '../../models/ticket';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tickets } from '../../models/tickets';

@Component({
  selector: 'app-tickets-info-and-confirmation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterModule, CommonModule],
  templateUrl: './tickets-info-and-confirmation.component.html',
  styleUrl: './tickets-info-and-confirmation.component.scss'
})
export class TicketsInfoAndConfirmationComponent implements OnInit {


  customerTickets: Ticket[] = [];
  totalAmt: number;
  ttlSeats: number;
  eventId: number;
  cusSeats: Seats[] = [];
  purchaseHistory: Tickets[] =[]
  customerId:number= 102;



constructor(private userService: UserService, private router: Router, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.customerTickets = this.userService.customerTickets;
    this.totalAmt = this.userService.totalAmt;
    this.ttlSeats = this.userService.seatsInCard.length;
    this.eventId = this.userService.eventId;
    this.cusSeats = this.userService.seatsInCard;
    //this.purchaseHistory = this.userService.purchaseHistoryByCustomerId;
    this.getTicketInfoByCustomerId(this.customerId);
    }

  eventMenu():void{

    console.log(this.customerTickets.toString);
     this.userService.totalAmt =0;
   this.userService.seatsInCard.length=0;
   
   this.userService.totalAmt =0;
    this.userService.eventId=0;
    this.userService.seatsInCard;
   
    this.ttlSeats =0;
    this.userService.totalTickets=0;
    this.router.navigate(['events']);
    

  }

  async getTicketInfoByCustomerId(customerId:number){
    console.log(customerId)
    try {
      const historyPurchase = await this.userService.getTicketInfoByCustomerId(customerId).toPromise();

       for(const ticket of historyPurchase){
        // Push individual tickets into the array
        this.purchaseHistory.push(ticket);
        //this.userService.purchaseHistoryByCustomerId.push(ticket);
    }
   console.log(this.purchaseHistory);
    } catch (error) {
      console.error('Error fetching ticket:', error);
    }
 
  }
 
}

