import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Book } from '../../data/interfaces/book.interface';
import Swal from 'sweetalert2';

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

updateBook(id: number, updatedData: FormData, errorCallback: (error: any) => void): void{
  this.http.post<any>(`${this.API_URL}/updatebook/${id}`, updatedData)
      .subscribe(
          (response) => {
              // Handle success
          },
          (error) => {
              errorCallback(error);
          }
      );
      // console.log(updatedData)
      // console.log(`${this.API_URL}/updatebook/${id}`);
}
 
deleteBook(bookId: number): Observable<any> {
  return this.http.delete<any>(`${this.API_URL}/deletebook/${bookId}`);
}

getBookById(id: number){
 return this.http.get<any>(`${this.API_URL}/bookdescription/${id}`); 
}

bookcategory(bookcategory: String | null, errorCallback: (error: any) => void){
  this.http.post(this.API_URL+'/bookcategory',  { bookcategory }).subscribe(
    (response) => {
       console.log(response);
       this.router.navigate(['/bookcategories']);
      //  return response;
    },
    (error) => {
          errorCallback(error);
    }
  )
}
booktype(booktype: String | null, errorCallback: (error: any) => void){
  this.http.post(this.API_URL+'/booktype',  { booktype }).subscribe(
    (response) => {
       console.log(response);
       this.router.navigate(['/booktypes']);
       return response;
    },
    (error) => {
          errorCallback(error);
    }
  )
}
showBookCategory(bookCategory: string | null): Observable<any[]> {
  return this.http.post<any[]>(`${this.API_URL}/bookcategory`, { bookcategory: bookCategory })
}
showBookType(bookType: string | null): Observable<any[]> {
  return this.http.post<any[]>(`${this.API_URL}/booktype`, { booktype: bookType })
}
showbook(): Observable<any> {
  return this.http.get<any>(this.API_URL+'/booklist')
}
// showtype(): Observable<any> {
//   return this.http.get<any>(this.API_URL+'/booktypelist')
// }
addbookcategory(category: string, errorCallback: (error: any) => void){
  const obj = {
    category: category
  }
  console.log(obj)
   this.http.post(this.API_URL+'/addbookcategory', obj)
   .subscribe(
    (response)=>{
      Swal.fire({
        icon: 'success',
        iconColor: '#fb3453',
        text: "Book category added successfully",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      })
         console.log(response)
    },
    (error) => {
      Swal.fire({
        icon: 'info',
        iconColor: '#fb3453',
        text: "Book category already exists",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      })
    }
   )
  }
  showbookcategory(): Observable<any>{
    return this.http.get<any>(this.API_URL+'/showbookcategory')
  }
addbooktype(type: string, errorCallback: (error: any) => void){
  const obj = {
    type: type
  }
  // console.log(category)
   this.http.post(this.API_URL+'/addbooktype', obj)
   .subscribe(
    (response)=>{
      Swal.fire({
        icon: 'success',
        iconColor: '#fb3453',
        text: "Book type added successfully",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      })
         console.log(response)
    },
    (error) => {
      Swal.fire({
        icon: 'info',
        iconColor: '#fb3453',
        text: "Book type already exists",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      })
       console.log(error)
    }
   )
}
showbooktype(): Observable<any>{
  return this.http.get<any>(this.API_URL+'/showbooktype')
}
}
