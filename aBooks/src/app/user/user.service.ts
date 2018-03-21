import {Book} from '../book.model'
// import {RequestedBooks} from '../requestedbooks.model'
import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/Subject';
import { AdminService } from '../admin/admin.service';
import { Http ,Response ,Headers} from '@angular/http';
import { AppService } from '../app.service';

 
@Injectable()
export class UserService {

    constructor(private adminService : AdminService,private http:Http, private appService: AppService){}
    
    onIssueBook(bookid: any,userid: any){
        console.log('id',bookid)
        let headers=new Headers;
        headers.append('Content-Type','application/json');
        return this.http.put('http://localhost:3000/request/'+bookid+'/'+userid,{headers:headers})
        .map((res:Response) =>{
          return res.json();
        })
    }
    onReturnBook(book: any,userid:any){
        console.log(book._id);
        let headers=new Headers;
        headers.append('Content-Type','application/json');
        return this.http.put('http://localhost:3000/return/'+book._id+'/'+userid,{headers:headers})
        .map((res:Response) =>{
          return res.json();
        })
    } 
    IsssuedBook(){
        const user = this.appService.user;    
        return this.http.get('http://localhost:3000/issuedbooks/'+user._id)
        .map((res:Response) =>{
          return res.json();
        })
    }
    getBooks(){
        return this.http.get('http://localhost:3000/allbooks')
                .map((res:Response) =>{
                  return res.json();
                })
    }
    getBook(id: string){
        return this.http.get('http://localhost:3000/bookdetails/' + id)
                .map((res:Response) =>{
                  return res.json();
                })
    }

}