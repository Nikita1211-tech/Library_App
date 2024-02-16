import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {;
  private API_URL= environment.API_URL;
  constructor( private router: Router, private http: HttpClient) {}
  addbook(bookname: string, bookimg: string, booksellingprice: string, bookcostprice: string, bookcategoryimg: string, bookwriter: string, booktypeimg: string, publishyear: string, booktype: string, bookcategories: string, summary: string, errorCallback: (error: any) => void): void{
    let obj = {
      bookname: bookname,
      bookimg: bookimg,
      booksellingprice: booksellingprice,
      bookcostprice: bookcostprice,
      bookcategoryimg: bookcategoryimg,
      bookwriter: bookwriter,
      booktypeimg: booktypeimg,
      publishyear: publishyear,
      booktype: booktype,
      bookcategories: bookcategories,
      summary: summary
  }
  this.http.post(this.API_URL+'/addbook', obj)
  .subscribe(
    (response) => {
    },
    (error) => {
      errorCallback(error);
    }
  );
}
   showbook(){
    return this.http.get<any>(this.API_URL+'/bookcategory')
}
}
