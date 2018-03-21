import { AppService } from '../../app.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IssuedBooks } from '../../issuedbooks.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-issuedbooks',
  templateUrl: './issuedbooks.component.html',
  styleUrls: ['./issuedbooks.component.css']
})
export class IssuedbooksComponent implements OnInit {
  constructor(public appService: AppService,private userService: UserService, private router: Router){}
  user = this.appService.user;
  books: IssuedBooks[]= [];

  ngOnInit() {
    this.userService.IsssuedBook().subscribe(
      (books)=>{
        this.books = books;
      }
    )
  }
  onReturn(book:any){
    console.log('return book',book);
    this.userService.onReturnBook(book,this.user._id).subscribe(
      (books)=>{
        this.books = books;
        this.router.navigate(['user/issuedbooks']);
      }
    )
  }

}
