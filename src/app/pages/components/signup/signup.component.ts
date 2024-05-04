import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router:Router){}


  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
    fname: [''],
    lname: [''],
    phoneNumber: [''],
    email: [''],
    password: ['']
    })
  }
  signup(): void{
      this.userService.signup(this.signupForm.value).subscribe((result: string) =>{
        if(result === "user already exist" ){
          alert("user aleady exist")
        }else{
          this.router.navigate(['']);
        }
      });
  }



}
