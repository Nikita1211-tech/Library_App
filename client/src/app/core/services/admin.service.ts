import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../data/interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {;
  private API_URL= environment.API_URL;
  constructor( private router: Router, private http: HttpClient) {}
//   addBook(bookName: string, img: string, sellingprice: string, costprice: string,  bookcat_img: string, writerName: string, booktype_img: string, publishyear: string,  booktypename: string, category: string, booksummary: string, errorCallback: (error: any) => void): void{
//       let obj = {
//       bookname: bookName,
//       bookimg: img,
//       booksellingprice: sellingprice,
//       bookcostprice: costprice,
//       bookcategoryimg: bookcat_img,
//       bookwriter: writerName,
//       booktypeimg: booktype_img,
//       publishyear: publishyear,
//       booktype: booktypename,
//       bookcategories: category,
//       summary: booksummary
//       }
//   this.http.post(this.API_URL+'/addbook', obj)
//   .subscribe(
//     (response) => {
//     },
//     (error) => {
//       errorCallback(error);
//     }
//   );
// }
addBook(formData: FormData, errorCallback: (error: any) => void): void {
  this.http.post<any>(this.API_URL+'/addbook', formData)
      .subscribe(
          (response) => {
              // Handle success
          },
          (error) => {
              errorCallback(error);
          }
      );
}

updateBook(id: Number, updatedData: FormData, errorCallback: (error: any) => void){
  this.http.post<any>(`${this.API_URL}/updatebook/${id}`, updatedData)
      .subscribe(
          (response) => {
              // Handle success
          },
          (error) => {
              errorCallback(error);
          }
      );
      console.log(updatedData)
      console.log(`${this.API_URL}/updatebook/${id}`);
}
 
deleteBook(bookId: number): Observable<any> {
  return this.http.delete<any>(`${this.API_URL}/deletebook/${bookId}`);
}

 showbook(){
   return this.http.get<any>(this.API_URL+'/bookcategory')
 }
 getBookById(id: number){
  return this.http.get<any>(`${this.API_URL}/bookdescription/${id}`); // Adjust the URL as per your API endpoint
  }
}
