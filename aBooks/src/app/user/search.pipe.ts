import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../book.model';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(books: Book[], name: string): Book[] {
    if(!books) return [];
    if(!name) return books;
name = name.toLowerCase();
return books.filter( it => {
      return JSON.stringify(it).toLowerCase().includes(name);
    });
   }

}
