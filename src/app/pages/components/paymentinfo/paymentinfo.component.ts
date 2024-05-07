import { Component, OnInit, Input, input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import {RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Login } from '../../models/Login';
import { LoginComponent } from '../login/login.component';
import { Paymentinfo } from '../../models/paymentinfo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paymentinfo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterModule, CommonModule],
  templateUrl: './paymentinfo.component.html',
  styleUrl: './paymentinfo.component.scss'
})
export class PaymentinfoComponent implements OnInit{


cId:number =this.userService.custumerId;

allCardsByCustomer: Paymentinfo[] = []

paymentinfoGroup: FormGroup;
  customerId: any;

constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router ){}

  ngOnInit(): void {
    this.paymentinfoGroup =this.formBuilder.group({
    cardNumber: ['' ,Validators.required],
    paymentType: ['',Validators.required],
    customerId:this.cId
    })
    this.paymentInfo(this.cId)
    
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
    this.userService.paymentInfos(customerId).subscribe((listOfcardsBycustomer: Paymentinfo[])=> this.allCardsByCustomer = listOfcardsBycustomer)
  }

  deletePaymentMethod(customerId:number, cardNumber: string):void{ 
    
    //console.log('this array' + this.allCardsByCustomer);

    this.userService.deletePaymentInfoByCustomerIdCardnumber(customerId, cardNumber).subscribe((result:string)=>
      
     this.allCardsByCustomer.splice(this.allCardsByCustomer.findIndex(paymentInfo => paymentInfo.cardNumber = cardNumber),1)
      )
      this.paymentInfo(customerId)
    
    }

  }



