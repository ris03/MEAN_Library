import { Component, OnInit } from '@angular/core';
import { Book } from '../../../book.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from '../../admin.service';


@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  book: Book=null; 
  id: any;
  constructor(private route: ActivatedRoute, private router: Router,private adminService: AdminService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) =>{
        this.id = params['id'];
        this.adminService.getBook(this.id).subscribe(
          (book:Book)=>{
            this.book=book;
            console.log(this.book);
            console.log(book);
          }
        );
      }
    )
    
  }
  onEditBook(){
    // this.router.navigate(['edit'],{relativeTo:this.route})
    this.router.navigate(['edit'],{relativeTo:this.route})
  }
  onDeleteBook(){
    this.adminService.deleteBook(this.id).subscribe(
      (book:Book)=>{
        this.book=book;
        this.router.navigate(['/admin/allbooks'])        
      }
    );
  }

}
