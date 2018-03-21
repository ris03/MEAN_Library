import {Book} from '../book.model'
import {RequestedBooks} from '../requestedbooks.model'
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Http ,Response ,Headers} from '@angular/http';
import { AppService } from '../app.service';

@Injectable()
export class AdminService {
    book:Book
    newBook : RequestedBooks
    booksChanged = new Subject<Book[]>()
    books: Book[] = [       
        // new Book('Maths','NCERT','Chanakya','This is just a MAths book',3),
        // new Book('Science','NCERT','Chintu','This is just a Science book',0),
        // new Book('English','NCERT','Priyanka','This is just an English book',1),
    ];
    requestedbooksChanged = new Subject<RequestedBooks[]>()     
    private requestedBooks: RequestedBooks[]=[ ]
    constructor(private http:Http, private appService: AppService){}
    // constructor(private shoppinglistService : ShoppingListService){}

    setBooks(books: Book[]){
        this.books = books;
        this.booksChanged.next(this.books.slice())
    }
 
    getBooks(){
        let headers=new Headers();
        headers.append('Authorization',this.appService.authToken);
        return this.http.get('http://localhost:3000/adminallbooks',{headers:headers})
                .map((res:Response) =>{
                  return res.json();
                })
    }
    getRequestedBooks(){
        return this.http.get('http://localhost:3000/admin')
                .map((res:Response) =>{
                  return res.json();
                })
    }
    acceptRequestedBooks(bookId:any,userID:any){
        let headers=new Headers();
        headers.append('Content-Type','application/json');
        return this.http.delete('http://localhost:3000/accept/'+bookId+'/'+userID,{headers:headers})
                .map((res:Response) =>{
                  return res.json();
                })
    }
    getBook(id: any){
        return this.http.get('http://localhost:3000/bookdetails/' + id)
                .map((res:Response) =>{
                  return res.json();
                })
    }
    setBook(book:Book,id: number){
        this.books[id]=book;
        this.booksChanged.next(this.books.slice())
    }
    // addIngredientsToShoppingList(ingredient:Ingredient[]){
    //     this.shoppinglistService.addIngredientss(ingredient)
    // }  
    addRequestedBook(book: Book){
        var bookname= book.name;
        var username='Chintu'
        // this.requestedBooks.push({ bookname ,username});
        this.booksChanged.next(this.books.slice());
    } 
    addBook(book: Book){
        let headers=new Headers;
        headers.append('Content-Type','application/json');
        return this.http.post('http://localhost:3000/newbook',book,{headers:headers})
        .map((res:Response) =>{
          return res.json();
        })
    }

    updateBook(index ,book){
        let headers=new Headers;
        headers.append('Content-Type','application/json');
        return this.http.put('http://localhost:3000/update/' + index,book,{headers:headers})
        .map((res:Response) =>{
          return res.json();
        })

    }
    deleteBook(index:number){
        let headers=new Headers;
        headers.append('Content-Type','application/json');
        return this.http.delete('http://localhost:3000/delete/' + index,{headers:headers})
        .map((res:Response) =>{
          return res.json();
        })
    }
}