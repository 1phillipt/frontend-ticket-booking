import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import {RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Login } from '../../models/Login';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-paymentinfo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './paymentinfo.component.html',
  styleUrl: './paymentinfo.component.scss'
})
export class PaymentinfoComponent implements OnInit{

customerId: number;
paymentinfo: FormGroup;

constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router ){}

  ngOnInit(): void {
    this.paymentinfo =this.formBuilder.group({
    cardNumber: [''],
    paymentType: ['']
    })
  }
  newPayment():void{
    
      this.router.navigate
  }

}
