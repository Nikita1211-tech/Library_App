import { Component } from '@angular/core';
import { Book } from '../../../data/interfaces/book.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from '../../../core/services/admin.service';
import { environment } from '../../../../environments/environment';
import { Category, Type } from '../../../data/interfaces/category.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  public environment = environment.IMG_URL
  categoryform: FormGroup
  typeform: FormGroup
  books: Book[]=[];
  categories : Category[]=[];
  types: Type[]=[];
  booktypes = [
    {name: 'Novel', abbrev: 'Novel'},
    {name: 'Newspaper', abbrev: 'Newspaper'},
    {name: 'Hypothetical', abbrev: 'Hypothetical'},
    {name: 'Research', abbrev: 'Research'},
    {name: 'Article', abbrev: 'Article'},
    {name: 'Magazine', abbrev: 'Magazine'},
    {name: 'Page 3', abbrev: 'Page 3'}
  ];
  visible: boolean = false;
  visibletypeform: boolean = false;
  // public chart: any;
  constructor(private router:Router, private http: HttpClient, private admin: AdminService){
    this.categoryform = new FormGroup({
      category: new FormControl('', [Validators.required, Validators.pattern(/^[ A-Za-z0-9./]*$/), Validators.minLength(3), Validators.maxLength(40)]),
      image: new FormControl('', [Validators.required, RxwebValidators.extension({extensions:["jpeg","jpg", "png"]}), RxwebValidators.fileSize({maxSize:5000000 })])
    })
    this.typeform = new FormGroup({
      type: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/),  Validators.minLength(3), Validators.maxLength(20)]),
      image: new FormControl('', [Validators.required, RxwebValidators.extension({extensions:['png','jpg','jpeg']}), RxwebValidators.fileSize({maxSize:51000000 })])

    })
  }
  
  ngOnInit(): void {
    this.admin.showbook().subscribe((books) => {
      this.books = books;
      console.log(books);
    });
    this.admin.showbookcategory().subscribe((categories) => {
      this.categories = categories;
      console.log(categories);
    });
    this.admin.showbooktype().subscribe((types) => {
      this.types = types;
      console.log(types);
    });
  }
  // Modal of edit book form  
  showDialog() {
    this.visible = true;
  }
  showTypeDialog() {
    this.visibletypeform = true;
  }
  getTypeFileName(): string {
    const fullPath = this.typeform.get('image')?.value;
    if (!fullPath) return '';
    return fullPath.split('\\').pop() || ''; 
  }
  onClickCategory(data: string): void{
    const bookcategory = data
    localStorage.setItem('bookcategory', bookcategory);
    console.log(bookcategory)
    this.admin.bookcategory(bookcategory, (error) => {
      console.log(error);
    })
  }
  onClickType(data: string): void{
   const booktype = data
   localStorage.setItem('booktype', booktype);
   console.log(booktype)
   this.admin.booktype(booktype, (error) => {
     console.log(error);
   })
  }
  // shows selcted image file name 
  getImageFileName(): string {
    const fullPath = this.categoryform.get('image')?.value;
    if (!fullPath) return ''; 
    return fullPath.split('\\').pop() || ''; 
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
  
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
//  Form submission API  of book category
  onAddingCategory(): void{
    if(!this.categoryform.valid) {
      this.markFormGroupTouched(this.categoryform);
    } 
    else{
      const category = this.categoryform.value.category.trim()
      const imageInput = document.getElementById('image') as HTMLInputElement;
      if (!imageInput || !imageInput.files || !imageInput.files[0]) {
        console.error('No image selected.');
        return;
      }
      const formData = new FormData();
      formData.append('category', category);
      formData.append('image', imageInput.files[0]);
  
      this.admin.addbookcategory(formData, (error: any) => {
      });

    }
  }
  //  Form submission API  of book type
  onAddingType(): void{
    if(!this.typeform.valid) {
      this.markFormGroupTouched(this.typeform);
    } 
    else{
      const type = this.typeform.value.type.trim()
      const imageInput = document.getElementById('image') as HTMLInputElement;
      if (!imageInput || !imageInput.files || !imageInput.files[0]) {
        console.error('No image selected.');
        return;
      }
      const formData = new FormData();
      formData.append('type', type);
      formData.append('image', imageInput.files[0]);
      this.admin.addbooktype(formData, (error: any) => {
       
      })

    }
  }
}
