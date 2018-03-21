import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../../book.model';
import { Subscription } from 'rxjs/Subscription';
import { AdminService } from '../../admin/admin.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AppService } from '../../app.service';
import { RequestedBooks } from '../../requestedbooks.model';


@Component({
  selector: 'app-allbooks',
  templateUrl: './allbooks.component.html',
  styleUrls: ['./allbooks.component.css']
})
export class AllbooksComponent implements OnInit, OnDestroy {
  books : RequestedBooks[]=[];
  book: any;
  user = this.appService.user;
  id:string;
  subscription: Subscription
  
  constructor(private adminService : AdminService, private router: Router,private route: ActivatedRoute, 
        private userService: UserService, public appService: AppService) { }

  ngOnInit() {
    this.userService.getBooks().subscribe(
      (books)=>{
        console.log('===',books)
        this.books=books;
      }
    );
  }
  onSearch(data: string){
    // console.log(data)
    this.router.navigate(['/user/search',data]) 
  }
  onIssue(id: any){
    console.log(id);
    // this.id = id;
    // this.userService.getBook(id).subscribe(
    //   (book:Book)=>{
    //     console.log('book',book)
    //     this.book=book;
    //     console.log(this.book);
        this.userService.onIssueBook(id,this.user._id).subscribe(
          (issuedbook) =>{
            // this.books=issuedbook;
            let index=this.books.findIndex(el=>el._id==id);
            this.books[index]=issuedbook;
          //  this.router.navigate(['/user/allbooks'],{relativeTo: this.route});
            // 
          }
        );
      // }
    // );
    
    // this.adminService.addRequestedBook(this.book)
    // console.log(this.book);
  }
  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }
  
}
