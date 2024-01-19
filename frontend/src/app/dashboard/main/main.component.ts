import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Writer } from '../../main';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
    books: Writer[]=[];
    constructor(){
      this.books.push(
        {
           img: "./../../../assets/images/book_2.png",
           bookName: "The Road Not Taken",
           writerName: "Rovert frost",
           price: "$5000"
        },
        {
           img: "./../../../assets/images/book_1.png",
           bookName: "The Road Not Taken",
           writerName: "Rovert frost",
           price: "$5000"
        },
        {
            img: "./../../../assets/images/book_3.png", 
            bookName: "The Road Not Taken",
            writerName: "Rovert frost",
            price: "$5000"
        },
        {
            img: "./../../../assets/images/book_1.png",
            bookName: "The Road Not Taken",
            writerName: "Rovert frost",
            price: "$5000"
        },
        {
           img: "./../../../assets/images/book_2.png",
           bookName: "The Road Not Taken",
           writerName: "Rovert frost",
           price: "$5000"
        }
      )
    }
}
