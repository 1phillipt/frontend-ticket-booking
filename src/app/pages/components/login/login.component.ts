import { Component,OnInit, Input } from '@angular/core';
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

  cId: number;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router){}


  ngOnInit(): void {
     this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password:['',Validators.required]
     });
  }

  login(): void {
    const loginData = this.loginForm.value;
    this.userService.login(loginData).subscribe(
      (cusId: number | null) => {
        if (cusId == null) {
          console.log("Please check email and password and try logging in again");
        } else {
          alert("Sign-in success");
          this.userService.customerId = cusId;
          this.router.navigate(['events']);
        }
      }, 
      error => {
       
        alert("Login failed, please check your email and password");
      }
    );
  }
  
  // login(): void {
  //   const logindata = this.loginForm.value;

    
  //     this.userService.login(logindata).subscribe(
  //     (cusId: number| null) => {
  //       this.cId = cusId;
  //       console.log(this.cId)
  //      if(cusId == null){
  //       console.log("please check email and password and try logging in again")
  //      }else{
  //       alert("signin success")
  //       this.cId = cusId;
  //       this.userService.customerId = this.cId;
  //       this.router.navigate(['events']);
    
  //       }
  //      }, error: (error) => {
  //         alert(error.message);
  //     }
  //   );
 
  // }
}


