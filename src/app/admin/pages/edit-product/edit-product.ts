import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Aa import karo
import { CommonModule } from '@angular/common'; // <-- NgIf, NgFor mate
import { ProductService } from '../../../service/product-service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.html',
  styleUrls: ['./edit-product.css'],
  standalone: true, // <-- Aa property add karo (jo tame Angular 14+ no use karoti hoi)
  imports: [
    CommonModule, // <-- NgIf, NgFor mate
    ReactiveFormsModule // <-- formGroup mate Aa IMP chhe!
  ]
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  productId: string | null = null;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  categories: string[] = ['Fresh Vegetables', 'Organic Fruits', 'Dairy & Breakfast', 'meat','snacks'];
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService // <-- Aa service inject karo (jo tame banavi hoi to)  
  ) {
    this.editProductForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]], // <-- 3 kar do (30 nahi)
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {

  this.route.paramMap.subscribe(params => {

    this.productId = params.get('id');

    if(this.productId){
      this.loadProductData(this.productId);
    }

  });

}

loadProductData(id:any){

this.productService.getbyid(id).subscribe((res:any)=>{

const product=res.data;

this.editProductForm.patchValue({

productName:product.pname,
category:product.category,
description:product.description,
price:product.price

})

this.imagePreview="http://localhost:3000/upload/"+product.pic

})

}
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget as HTMLElement;
    element.classList.add('dragover');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('dragover');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('dragover');

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (this.isValidImage(file)) {
        this.selectedImage = file;
        this.createImagePreview(file);
      }
    }
  }

  isValidImage(file: File): boolean {
    const validTypes = ['image/png', 'image/webp', 'image/jpeg'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload PNG, WebP, or JPEG images only.');
      return false;
    }
    
    if (file.size > maxSize) {
      alert('File size should not exceed 10MB.');
      return false;
    }
    
    return true;
  }

  createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.selectedImage = null;
    this.imagePreview = null;
  }

  onSubmit(){

if(this.editProductForm.valid){

const formData=new FormData();

formData.append("pname",this.editProductForm.value.productName)
formData.append("category",this.editProductForm.value.category)
formData.append("description",this.editProductForm.value.description)
formData.append("price",this.editProductForm.value.price)

if(this.selectedImage){
formData.append("pic",this.selectedImage)
}

this.productService.updateProduct(this.productId,formData)
.subscribe((res:any)=>{

alert("Product Updated Successfully")

this.router.navigate(['/admin/showproduct'])

})

}

}

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/products']);
  }

  // Getter methods for template
  get productName() { return this.editProductForm.get('productName'); }
  get category() { return this.editProductForm.get('category'); }
  get description() { return this.editProductForm.get('description'); }
  get price() { return this.editProductForm.get('price'); }

  
}