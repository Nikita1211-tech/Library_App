import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterService } from '../../../core/services/register.service';
import { AdminService } from '../../../core/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../data/interfaces/category.interface';
import { environment } from '../../../../environments/environment';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import Swal from 'sweetalert2';

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
      category: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/),  Validators.minLength(6), Validators.maxLength(20)]),
      image: new FormControl('', [Validators.required, RxwebValidators.extension({extensions:['png','jpg','jpeg','gif']}), RxwebValidators.fileSize({maxSize: 5242880}) ])
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
  
  getImageFileName(): string {
    const fullPath = this.editcategoryform.get('image')?.value;
    if (!fullPath) return ''; 
    console.log(fullPath)
    return fullPath.split('\\').pop() || ''; 
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
  
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    })
  }
  // Form Submission Function
  // Form Submission Function
  onEditingCategory(): void{
    if(!this.editcategoryform.valid) {
      this.markFormGroupTouched(this.editcategoryform);
    } 
    else{
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
getImageUrl(): string | ArrayBuffer | null {
  if (this.selectedFile) {
    console.log(this.environment+this.selectedFile.name)
    return this.environment+'uploads/'+this.selectedFile.name;
  } else {
    console.log(this.environment + this.bookcategoryimg)
    return this.environment + this.bookcategoryimg;
  }
}
} 
