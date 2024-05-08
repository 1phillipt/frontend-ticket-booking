import { Component, OnInit, Input } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Seats } from '../../models/seats';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventsComponent } from '../events/events.component';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-seats',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterModule, CommonModule],
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.scss'
})
export class SeatsComponent implements OnInit{
  
 //eventId: number;
  formGroup: FormGroup;

  seatList: Seats[] = [];
  cardSeats: Seats[]= [];
  eventId: number;
  customerId: number;




  inCard: boolean =false;

  totalAmt: number = 0;
  totalTickets:number=0;

  targetProducts: Seats[];

  constructor( private userService: UserService, private router: Router, private route:ActivatedRoute){}

  ngOnInit(): void {
  this.cardSeats = this.userService.seatsInCard;
  this.totalAmt = this.userService.totalAmt;
  this.totalTickets = this.userService.totalTickets;

    this.eventId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.userService.eventId = this.eventId;
    
    console.log(this.eventId)

    this.customerId = this.userService.customerId;
    
    this.listSeats(this.eventId);
    
    
    
  }
listSeats(eid:number):void{
  this.userService.seatList(eid).subscribe((listOfseat: Seats[])=>{
    console.log(listOfseat);
      this.seatList = listOfseat;
      //alert(this.customerId)
  })}

  seatsInCard(seat:Seats):void{

   if(this.cardSeats.find(cardseat => cardseat.seatNumber === seat.seatNumber)?.seatID === seat.seatID){
    alert("already in card")
   }else{this.cardSeats.push(seat);
    
     this.inCard = this.cardSeats.some(s => s.seatID === seat.seatID);
    
     this.cardPlus(seat);
   }
   this.userService.seatsInCard = this.cardSeats;
   this.userService.eventId = this.eventId ;
   this.userService.totalAmt= this.totalAmt;
   this.userService.totalTickets = this.totalTickets;
  }
  
  DeleteSeatFromCard(seatNumber:string ):void{
    this.totalAmt = this.totalAmt - this.cardSeats.find(cardseat => cardseat.seatNumber === seatNumber)?.price || 0;
    this.totalTickets -=1;

    this.cardSeats.splice(this.cardSeats.findIndex(cardseat => cardseat.seatNumber == seatNumber), 1);

    this.userService.seatsInCard = this.cardSeats;
    this.userService.eventId = this.eventId ;
    this.userService.totalAmt= this.totalAmt;
    this.userService.totalTickets = this.totalTickets;
}
cardPlus(seat:Seats):void{
 
    this.totalAmt += seat.price;
    this.totalTickets +=1;
   
}

ticketsAndconfirmation():void{

}


}
