import { Component, OnInit, Input, input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import {RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Login } from '../../models/Login';
import { LoginComponent } from '../login/login.component';
import { Paymentinfo } from '../../models/paymentinfo';

@Component({
  selector: 'app-paymentinfo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './paymentinfo.component.html',
  styleUrl: './paymentinfo.component.scss'
})
export class PaymentinfoComponent implements OnInit{

  cId:number;

paymentinfo: FormGroup;

constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router ){}

  ngOnInit(): void {
    this.paymentinfo =this.formBuilder.group({
    cardNumber: [''],
    paymentType: ['']
    })
     }
  
  savePaymentInfo():void{
    this.paymentinfo.value[this.cId = this.userService.custumerId]
    this.userService.newPaymentInfo(this.paymentinfo.value).subscribe((result:String) =>
      {
        if(result === "saved"){
          alert("payment saved")
        } else{
            alert("error saving payment information")
        }
      })
  }

  paymentInfo():void{
    
  }


}
