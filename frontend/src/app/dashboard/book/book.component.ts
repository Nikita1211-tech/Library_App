import { Component, OnInit } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { Writer } from '../../main';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [MainComponent, NgFor],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent{
 
}
