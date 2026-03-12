import { Component } from '@angular/core';
// import { ProductService } from '../../../service/product-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidation } from '../../../custom-validation/custom-validation';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../service/product-service';


@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule,CustomValidation,RouterLink],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
productForm!:FormGroup
  selectedFile!: File;
  constructor(private pservice:ProductService,private fb:FormBuilder){
    this.productForm=this.fb.group({
      pname:['',Validators.required],
      price:['',[Validators.required,Validators.min(1)]],
      category:['',Validators.required],
      pic:['',Validators.required],
      description:['',Validators.required]
    })
   }
   onFileChange(event: any) {
     this.selectedFile= event.target.files[0];
  }

  onSubmit(){
    this.productForm.markAllAsTouched();
    if(this.productForm.valid){
      const formData=new FormData();
      formData.append('pname',this.productForm.value.pname)
      formData.append('price',this.productForm.value.price)
      formData.append('category',this.productForm.value.category)
      formData.append('description',this.productForm.value.description)
      formData.append('pic',this.selectedFile);
      this.pservice.add(formData).subscribe({
          next:(res:any)=>{
          alert(res.message)
          window.location.href='/admin/showproduct'
          },
        error:(err:any)=>{
          console.log(err)
        }
      })



      this.pservice.add(formData)
      
    }
  }
}