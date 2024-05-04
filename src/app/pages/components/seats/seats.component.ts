import { Component, OnInit } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Seats } from '../../models/seats';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventsComponent } from '../events/events.component';
import { CommonModule } from '@angular/common';

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



  targetProducts: Seats[];

  constructor( private userService: UserService, private router: Router, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.eventId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.eventId)

    this.listSeats(this.eventId);

        
    
  }
listSeats(eid:number):void{
  this.userService.seatList(eid).subscribe((listOfseat: Seats[])=>{
    console.log(listOfseat);
      this.seatList = listOfseat;
  })}

  seatsInCard(seat:Seats):void{
  
    this.cardSeats.push(seat);
    console.log(this.cardSeats)
  
  }
  DeleteSeatFromCard(seatId:Number ):void{
    console.log(seatId);

    this.cardSeats.splice(this.cardSeats.findIndex(cardseat => cardseat.seatID == seatId), 1);

    console.log(this.cardSeats);
}
}
