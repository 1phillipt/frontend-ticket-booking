import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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

  @Input() customerId = 1;

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router:Router){}


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
      this.userService.signup(this.signupForm.value).subscribe((cusId: number) =>{
        if(cusId !== null){
          alert("user aleady exist by given phone number or email")
        }else{
          alert("signup successful, you can login now")
          this.router.navigate(['']);
        }
      });
  }



}
