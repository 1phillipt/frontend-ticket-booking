import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Seats } from '../../models/seats';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-tickets-info-and-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './tickets-info-and-confirmation.component.html',
  styleUrl: './tickets-info-and-confirmation.component.scss'
})
export class TicketsInfoAndConfirmationComponent implements OnInit {

//ticketconfirmationForm: FormGroup;
ticketId: number;
customerId: number;
eventId: number;
seats:Seats[] =[];
paymentInfoId: number;

constructor(private userService: UserService){}


  ngOnInit(): void {
  
    // this.customerId =this.userService.custumerId;
    // this.eventId=this.userService.eventId;
    // this.seats=this.userService.seatsInCard;
    // this.paymentInfoId = this.userService.paymentInfoId;
    // console.log(this.paymentInfoId);

    }
  

  

}
