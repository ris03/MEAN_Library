import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppService } from '../app.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router:Router,private appService: AppService) { }
  ngOnInit() {
  }
  onSubmit(loginForm:NgForm){
    const value = loginForm.value;
    console.log(value);
    if(value){
      const user={
        username: value.username,
        password: value.password
      }
           this.appService.login(user).
           subscribe(
             (res)=>{
               console.log('res',res)
               if(res.success){
                 console.log('===',res.user.username);
                 if(res.user.username == 'admin@cfe.com'){
                  this.router.navigate(['/admin']) 
                 } else {
                  this.router.navigate(['/user']) 
                 }
               }
               else{
                this.router.navigate(['/'])
                console.log(res.msg) 
               }

            //    console.log("new user",res);
            //  this.router.navigate(['/user'])          
             }
           );
    }
  }

}
