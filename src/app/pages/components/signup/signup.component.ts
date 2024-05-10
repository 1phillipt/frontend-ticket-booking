import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, CommonModule,ToastModule],
  providers:[MessageService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{

  @Input() customerId = 1;

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router:Router, private messageService: MessageService){}


  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required] 
    })
  }
  signup(): void{
      this.userService.signup(this.signupForm.value).subscribe((result: string) =>{
        if(result === "exist"){
          this.messageService.add({ severity: 'warn', summary: 'warn', detail: 'user aleady exist by given phone number or email' });
        
        }else{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'user aleady exist by given phone number or email' });
          this.router.navigate(['']);
        }
        },error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Signup failed, please check your email and password, password should be length of atleast 6' });
       
      });
      
  }



}
