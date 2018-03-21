import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {User} from '../user.model'
import { AppService } from '../app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router:Router,private appService: AppService) { }

  ngOnInit() {
  }
  onSubmit(userForm:NgForm){
    const value = userForm.value;
    console.log(value);
    if(value){
      const newUser={
        name:value.name,
        branch:value.branch,
        username: value.username,
        password: value.password,
        booksissued:[]
      }
           this.appService.registerUser(newUser).
           subscribe(
             (user:User)=>{
               console.log("new user",newUser);
             this.router.navigate(['/login'])          
             }
           );
    }
    
       }
     }

