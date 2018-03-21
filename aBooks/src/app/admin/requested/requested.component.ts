import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AdminService } from '../admin.service';
import { Book } from '../../book.model';
import { RequestedBooks } from '../../requestedbooks.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requested',
  templateUrl: './requested.component.html',
  styleUrls: ['./requested.component.css']
})
export class RequestedComponent implements OnInit, OnDestroy {
  subscription:Subscription;
  books: RequestedBooks[];

  constructor(private adminService : AdminService, private router: Router) { }

  ngOnInit() {
    this.adminService.getRequestedBooks().subscribe(
      (books)=>{
        this.books=books;
      }
    );
  }
  onAccept(bookID: any,userID: any){
    this.adminService.acceptRequestedBooks(bookID,userID).subscribe(
      (books)=>{
        this.books=books;
        this.router.navigate(['admin/requested'])
      }
    );
  } 

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }

}
