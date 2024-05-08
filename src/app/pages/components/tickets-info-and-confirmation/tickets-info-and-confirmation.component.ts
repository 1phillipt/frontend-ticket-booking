import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tickets-info-and-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './tickets-info-and-confirmation.component.html',
  styleUrl: './tickets-info-and-confirmation.component.scss'
})
export class TicketsInfoAndConfirmationComponent implements OnInit {

ticketconfirmationForm: FormGroup;


  ngOnInit(): void {
    this.ticketconfirmationForm
  
  }

}
