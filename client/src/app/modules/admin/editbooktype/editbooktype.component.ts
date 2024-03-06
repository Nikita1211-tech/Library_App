import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Type } from '../../../data/interfaces/category.interface';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterService } from '../../../core/services/register.service';
import { AdminService } from '../../../core/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editbooktype',
  templateUrl: './editbooktype.component.html',
  styleUrl: './editbooktype.component.css'
})
export class EditbooktypeComponent {
  public environment = environment.IMG_URL
  edittypeform: FormGroup
  booktypeid: number
  type: Type[] = []
  booktypeimg: string | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder,private auth: AuthService, private register: RegisterService, private admin: AdminService, private route: ActivatedRoute, private router: Router){
    this.booktypeid = this.route.snapshot.params['id'];
    this.edittypeform = new FormGroup({
      type: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]/)]),
      image: new FormControl('',[ Validators.required,])
    })
  }
  ngOnInit(): void {
    this.admin.getBookTypeById(this.booktypeid).subscribe((type) => {
      this.type = type
      this.booktypeimg = type.image
      console.log(type.image)
      this.edittypeform.patchValue({ 
        type: type.type, 
        image: type.image
      });
    })
    
    console.log(this.edittypeform.get('image')?.value)
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }
    console.log(this.selectedFile)
  }
  
  getImageFileName(): string {
    const fullPath = this.edittypeform.get('image')?.value;
    if (!fullPath) return ''; // Return empty string if no file is selected
    return fullPath.split('\\').pop() || ''; // Extract file name from full path
  }
  // Form Submission Function
  onEditingType(): void{
    const formData = new FormData();
    const id =this.booktypeid
    Object.keys(this.edittypeform.value).forEach(key => {
      const value = this.edittypeform.value[key];
      formData.append(key, value);
    });
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    else {
      const currentImageValue = this.environment + this.booktypeimg;
      console.log(currentImageValue)
      if (currentImageValue) {
          formData.append('image', currentImageValue);
      }
  }
    this.admin.updatebooktype(formData, id)
  }
  getImageUrl(): string | ArrayBuffer | null {
    if (this.selectedFile) {
      console.log(this.environment+this.selectedFile.name)
      return this.environment+'uploads/'+this.selectedFile.name;
    } else {
      console.log(this.environment + this.booktypeimg)
      return this.environment + this.booktypeimg;
    }
  }
}
