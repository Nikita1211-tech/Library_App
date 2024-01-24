import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Writer } from '../../main';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
    books: Writer[]=[];
    constructor(private router:Router){
      this.books.push(
        {
           book_id: "BOOK123",
           img: "./../../../assets/images/book_2.png",
           bookName: "The Road Not Taken",
           writerName: "Rovert frost",
           price: "$5000"
        },
        {
          book_id: "BOOK124",
           img: "./../../../assets/images/book_1.png",
           bookName: "The Road Not Taken",
           writerName: "Rovert frost",
           price: "$5000"
        },
        {
            book_id: "BOOK125",
            img: "./../../../assets/images/book_3.png", 
            bookName: "The Road Not Taken",
            writerName: "Rovert frost",
            price: "$5000"
        },
        { 
            book_id: "BOOK126",
            img: "./../../../assets/images/book_1.png",
            bookName: "The Road Not Taken",
            writerName: "Rovert frost",
            price: "$5000"
        },
        {
          book_id: "BOOK127",
           img: "./../../../assets/images/book_2.png",
           bookName: "The Road Not Taken",
           writerName: "Rovert frost",
           price: "$5000"
        },

      )
    }
    redirecttobookdescription(book_id: String){
      this.router.navigate(['/book', book_id]);
    }
}
