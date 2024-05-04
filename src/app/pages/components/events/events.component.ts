import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

import { Events } from '../../models/Events';

import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeatsComponent } from '../seats/seats.component';
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterModule, CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit{


  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService){}

   eventList: Events[] = [];

  ngOnInit(): void {
 this.events()
  }

  events():void{
    this.userService.EventsList().subscribe((listOfEvents: Events[])=>{
      console.log(listOfEvents);
        this.eventList = listOfEvents;
    }
  
  )}


}
