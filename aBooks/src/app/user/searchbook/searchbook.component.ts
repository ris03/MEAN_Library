import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Book } from '../../book.model';
import { Subscription } from 'rxjs/Subscription';
import { AdminService } from '../../admin/admin.service';



@Component({
  selector: 'app-searchbook',
  templateUrl: './searchbook.component.html',
  styleUrls: ['./searchbook.component.css']
})
export class SearchbookComponent implements OnInit {
  books : Book[]=[];
  name:string;
  constructor(private route: ActivatedRoute,private adminService : AdminService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.name = params['name'];
        console.log(this.name);
      } 
    )
    this.adminService.getBooks().subscribe(
      (books)=>{
        this.books=books;
        console.log(books);
      }
    );
  }

}
