import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import {RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Events } from '../../models/Events';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  customerId: number;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router){}


  ngOnInit(): void {
     this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
     });
  }
  login(): void {
    const logindata = this.loginForm.value;
  
    this.userService.login(logindata).subscribe(
      (cusId: number| null) => {
        this.customerId = cusId;
        alert(this.customerId)
       if(cusId === null){
        alert("please check email and password and try logging in again")
       }else{
        alert("signin success")
        this.customerId = cusId;
        this.router.navigate(['events']);
       }  
      }
    );
  }
}


