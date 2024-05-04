import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router){}


  ngOnInit(): void {
     this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
     });
  }
  login(): void {
    const logindata = this.loginForm.value;
  
    this.userService.login(logindata).subscribe(
      (result: string) => {
       if(result ==='login successful'){
        alert("signin success")
        this.router.navigate(['events']);
       }else{
        alert(result)
       }  
      }
    );
  }
}


