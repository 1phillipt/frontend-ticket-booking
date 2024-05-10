import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Seats } from '../../models/seats';
import { UserService } from '../../../services/user.service';
import { Ticket } from '../../models/ticket';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tickets } from '../../models/tickets';
import { CustomerInfo } from '../../models/customer-info';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-tickets-info-and-confirmation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterModule, CommonModule,ConfirmDialogModule],
  providers: [ConfirmationService, MessageService],
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
  customerId:number;
  customerInfos: CustomerInfo;



constructor(private userService: UserService, private router: Router, private route:ActivatedRoute,private confirmationService: ConfirmationService, private messageService: MessageService){}

  ngOnInit(): void {
    this.customerId = this.userService.customerId;
    this.customerTickets = this.userService.customerTickets;
    this.totalAmt = this.userService.totalAmt;
    this.ttlSeats = this.userService.seatsInCard.length;
    this.eventId = this.userService.eventId;
    this.cusSeats = this.userService.seatsInCard;
    //this.purchaseHistory = this.userService.purchaseHistoryByCustomerId;
    this.getTicketInfoByCustomerId(this.customerId);
    this.getCustomerInfoByCustomerId(this.customerId);
    this.userService.customerId = this.customerId
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
  getCustomerInfoByCustomerId(customerId:number){
    this.userService.getCustomerInfoByCustomerId(customerId).subscribe((customerInfo: CustomerInfo)=>{
      this.customerInfos = customerInfo;
    })
  }
  logout() {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to logout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Logout', detail: 'You have accepted' }); 
          this.router.navigate(['']); 
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
  });

   
  }
 
}

