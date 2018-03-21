import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Http ,Response ,Headers} from '@angular/http';
import {User} from './user.model'

@Injectable()
export class AppService{
    public user:any;
    public authToken:any;
    constructor(private http:Http){}
    
    registerUser(user: User){
        console.log("service",user)
        let headers=new Headers;
        headers.append('Content-Type','application/json');
        return this.http.post('http://localhost:3000/signup',user,{headers:headers})
        .map((res:Response) =>{
          return res.json();
        })
    }
    login(user){
        console.log('login== user',user);
        let headers=new Headers;
        headers.append('Content-Type','application/json');
        return this.http.post('http://localhost:3000/login',JSON.stringify(user),{headers:headers}) //JSON.stringify(user) = user
        .map((response:Response) =>{
        console.log('login response',response);  

            localStorage.setItem('id_token',response.json().token);
            localStorage.setItem('user',JSON.stringify(response.json().user));     
             this.user=response.json().user;
             console.log('this user',response.json().user)
             this.authToken=response.json().token;
             return response.json();
           
        });
    }
onLogOut()
  {
    if(this.user)
    {
    console.log(this.user);
    this.http.get("http://localhost:3000/logout").subscribe((response:Response)=>{    
    });
    this.user=undefined;
    this.authToken=undefined;
    localStorage.clear();
  }
  }
  getUser(){
    if(!this.user){
      if(localStorage.getItem('user') != undefined){
        this.user=JSON.parse(localStorage.getItem('user'));
      }
    }
  }
}