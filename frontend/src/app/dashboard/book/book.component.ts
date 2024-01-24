import { Component } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { Writer } from '../../main';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [MainComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
   books: Writer[]= []
}
