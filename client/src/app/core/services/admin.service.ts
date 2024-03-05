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
            console.log(response)
             Swal.fire({
               title: "Book added successfully",
               icon: 'success',
               showCancelButton: false,
               showConfirmButton: false,
               timer: 1500
             }).then((result) => {
               // window.location.reload();
               // this.router.navigate(['/login']);
             });
          },
          (error) => {
            console.log(error)
              errorCallback(error);
          }
      );
}

updateBook(id: number, updatedData: FormData){
  this.http.put<any>(`${this.API_URL}/updatebook/${id}`, updatedData)
      // console.log(updatedData)
      // console.log(`${this.API_URL}/updatebook/${id}`);
}
 
deleteBook(bookId: number): Observable<any> {
  return this.http.delete<any>(`${this.API_URL}/deletebook/${bookId}`);
}

getBookById(id: number){
 return this.http.get<any>(`${this.API_URL}/bookdescription/${id}`); 
}

getBookCategoryById(id: number){
  return this.http.get<any>(`${this.API_URL}/bookcategorydescription/${id}`); 
}

getBookTypeById(id: number){
  return this.http.get<any>(`${this.API_URL}/booktypedescription/${id}`); 
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
  return this.http.get<any>(this.API_URL+'/books')
}
showcategory(): Observable<any> {
  return this.http.get<any>(this.API_URL+'/books')
}
// showtype(): Observable<any> {
//   return this.http.get<any>(this.API_URL+'/booktypelist')
// }
addbookcategory(formData: FormData, errorCallback: (error: any) => void): void {
  this.http.post(this.API_URL + '/addbookcategory', formData)
    .subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          iconColor: '#fb3453',
          text: "Book category added successfully",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(response);
      },
      (error) => {
        Swal.fire({
          icon: 'info',
          iconColor: '#fb3453',
          text: "Book category already exists",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500,
        });
        errorCallback(error);
      }
    );
}

updatebookcategory(formdata: FormData, id: number){
  this.http.put<any>(`${this.API_URL}/updatebookcategory/${id}`, formdata)
  .subscribe(response => {
    if(response){
      Swal.fire({
        title: 'Category updated successfully',
        icon: 'success',
        showCancelButton: false,
        showConfirmButton:false,
        timer: 1500
      }).then((result) => {
        // window.location.reload();
        this.router.navigate(['/bookcategorydetail'])
      });
    }
    console.log(response.message)
  }, error => {
    if(error){
      console.log(error.message)
      Swal.fire({
        title: 'Category already exists',
        icon: 'error',
        showCancelButton: false,
        showConfirmButton:false,
        timer: 1500
      })
    }
    console.error('Error updating category:', error);
  });
}

deleteBookCategory(bookId: number): Observable<any> {
  return this.http.delete<any>(`${this.API_URL}/deletebookcategory/${bookId}`);
}

showbookcategory(): Observable<any>{
  return this.http.get<any>(this.API_URL+'/showbookcategory')
}
addbooktype(formData: FormData, errorCallback: (error: any) => void){
  // console.log(category)
   this.http.post(this.API_URL+'/addbooktype', formData)
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

updatebooktype(formdata: FormData, id: number){
  this.http.put<any>(`${this.API_URL}/updatebooktype/${id}`, formdata)
  .subscribe(response => {
    if(response){
      Swal.fire({
        title: 'Type updated successfully',
        icon: 'success',
        showCancelButton: false,
        showConfirmButton:false,
        timer: 1500
      }).then((result) => {
        // window.location.reload();
        this.router.navigate(['/booktypedetail'])
      });

    }
    console.log(response.message)
    // console.log('Type updated successfully:', response);
  }, error => {
    console.log(error.message)
    if(error){
      Swal.fire({
        title: 'Type already exists',
        icon: 'error',
        showCancelButton: false,
        showConfirmButton:false,
        timer: 1500
      })

    }
    console.error('Error updating category:', error);
  });
}

deleteBookType(bookId: number): Observable<any> {
  return this.http.delete<any>(`${this.API_URL}/deletebooktype/${bookId}`);
}

showbooktype(): Observable<any>{
  return this.http.get<any>(this.API_URL+'/showbooktype')
}
}
