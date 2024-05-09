import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Seats } from '../../models/seats';
import { UserService } from '../../../services/user.service';
import { Ticket } from '../../models/ticket';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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



constructor(private userService: UserService, private router: Router, private route:ActivatedRoute){}


  ngOnInit(): void {
    this.customerTickets =this.userService.customerTickets;
    this.totalAmt = this.userService.totalAmt;
    this.ttlSeats = this.userService.seatsInCard.length;
    this.eventId = this.userService.eventId;
    this.cusSeats = this.userService.seatsInCard;
    //this.getTicketByEventIdAndseatNumber();

    }

  eventMenu():void{
this.userService.totalAmt =0;
   this.userService.seatsInCard.length=0;
   this.userService.totalAmt =0;
    this.userService.eventId=0;
    this.userService.seatsInCard;
    this.ttlSeats =0;
    this.userService.totalTickets=0;
    this.router.navigate(['events']);
    

  }
    

}
