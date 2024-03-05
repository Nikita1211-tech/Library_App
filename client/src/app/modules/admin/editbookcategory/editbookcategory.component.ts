import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterService } from '../../../core/services/register.service';
import { AdminService } from '../../../core/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../data/interfaces/category.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-editbookcategory',
  templateUrl: './editbookcategory.component.html',
  styleUrl: './editbookcategory.component.css'
})
export class EditbookcategoryComponent implements OnInit{
  public environment = environment.IMG_URL
  editcategoryform: FormGroup
  bookcategoryid: number
  category: Category[] = []
  bookcategoryimg: string | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder,private auth: AuthService, private register: RegisterService, private admin: AdminService, private route: ActivatedRoute, private router: Router){
    this.bookcategoryid = this.route.snapshot.params['id'];
    this.editcategoryform = new FormGroup({
      category: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]/)]),
      image: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    this.admin.getBookCategoryById(this.bookcategoryid).subscribe((category) => {
      this.category = category
      this.bookcategoryimg = category.image
      console.log(category.image)
      this.editcategoryform.patchValue({ 
        category: category.category, 
        image: category.image
      });
    })
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }
  }
  // Form Submission Function
  onEditingCategory(): void{
    const formData = new FormData();
    const id =this.bookcategoryid
    Object.keys(this.editcategoryform.value).forEach(key => {
      const value = this.editcategoryform.value[key];
      formData.append(key, value);
    });
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    this.admin.updatebookcategory(formData, id)
  }
} 
