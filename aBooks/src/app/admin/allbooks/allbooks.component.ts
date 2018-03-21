import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../../book.model';
import { Subscription } from 'rxjs/Subscription';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-allbooks',
  templateUrl: './allbooks.component.html',
  styleUrls: ['./allbooks.component.css'],
  providers:[AdminService]
})
export class AllbooksComponent implements OnInit,OnDestroy {
  books : Book[]=null;
  subscription: Subscription;

  constructor(private adminService : AdminService) { }



  ngOnInit() {
    this.adminService.getBooks().subscribe(
      (books)=>{
        this.books=books;
      }
    );
  }
  

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }

}
