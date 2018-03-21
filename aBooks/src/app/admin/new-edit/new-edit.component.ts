import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AdminService } from '../admin.service';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { Book } from '../../book.model';


@Component({
  selector: 'app-new-edit',
  templateUrl: './new-edit.component.html',
  styleUrls: ['./new-edit.component.css']
})
export class NewEditComponent implements OnInit {

  id: any;
  editMode = false;
  bookForm :FormGroup;
  books: Book ;
  // book: Book[] =[]
 bookName ='';
 genre ='';
    totalunits = 0;

  constructor(private route: ActivatedRoute,private router:Router, private adminService: AdminService) { }

  ngOnInit() {
    
    this.route.params.subscribe(
      (params:Params) =>{
        this.id = params['id'];
        this.editMode = params['id'] != null;
        const books = this.adminService.getBook(this.id).subscribe(

        )
        this.initForm();
      }
    )
    // this.adminService.getBook(this.id).subscribe(
    //   (book)=>{
    //     this.books=book;
    //     console.log("ddd",book)
    //     console.log("ssssss",this.books)
    //   }
    // );
  } 

 

   private initForm(){
    
    if(this.editMode){
      // const book = this.adminService.getBook(this.id);  
      this.adminService.getBook(this.id).subscribe(
        (books)=>{
          // console.log('aaaaaaa',books);
          this.books=books;
      // console.log(this.books);
      this.bookName = this.books.name;
      this.totalunits= this.books.units;
      this.genre = this.books.genre
     
        }
      );    
    }
  }

  // onAddIngredient(){
  //   (<FormArray>this.bookForm.get('ingredients')).push(
  //     new FormGroup({
  //       'name': new FormControl(null,Validators.required),
  //       'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
  //     })
  //   )
  // }
  onSubmit(bookForm:NgForm){
 const value = bookForm.value;
 console.log(value)


 const newbook={
  name: value.name,
  genre: value.genre,
  units: value.totalunits,
  availableunits:value.totalunits,
  issuedunits:0
 }
 if(this.editMode){
  this.adminService.getBook(this.id).subscribe(
    (books:Book)=>{
      books.name= value.name,
      books.units= value.totalunits,
      books.genre = value.genre, 
      books.availableunits = books.units-books.issuedunits;
       
      if(books.availableunits>=0){
        this.adminService.updateBook(this.id,books).subscribe(
          (book:Book)=>{
            console.log("new book",book);
            this.onCancel();
          }
        ); 
      }
      else{
        this.onCancel();
      }
    
      // this.adminService.updateBook(this.id,books).subscribe(
      //   (book:Book)=>{
      //     console.log("new book",book);
      //     this.onCancel();
      //   }
      // );
    }
  )
}
    
    else{
      this.adminService.addBook(newbook).
      subscribe(
        (book:Book)=>{
          console.log("new book",newbook);
          this.onCancel();
      this.router.navigate(['admin/allbooks'])          
        }
      );
    }
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  // onDeleteIngredient(index:number){
  //   ( <FormArray>this.bookForm.get('ingredients')).removeAt(index);
  // }
  }

