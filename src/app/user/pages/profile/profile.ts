import { NgClass, NgIf, NgForOf, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Order {
  id: string;
  date: Date;
  items: number;
  total: number;
  status: 'delivered' | 'processing' | 'shipped';
}

@Component({
  selector: 'app-profile',
  imports: [NgIf, NgClass, ReactiveFormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isEditing: boolean = false;
  activeTab: string = 'profile';
  
  userData = {
    firstName: localStorage.getItem('name'),
    lastName: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    phone: localStorage.getItem('mobileno'),
    currentPassword: '********',
    newPassword: '',
    confirmPassword: '',
    address: '42 Green Valley Road, Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    deliveryInstructions: 'Leave with doorman. Ring bell twice.'
  };

  recentOrders: Order[] = [
    { id: 'ORD-2024-001', date: new Date('2024-01-15'), items: 8, total: 86.50, status: 'delivered' },
    { id: 'ORD-2024-002', date: new Date('2024-01-18'), items: 12, total: 124.30, status: 'processing' },
    { id: 'ORD-2024-003', date: new Date('2024-01-20'), items: 5, total: 45.75, status: 'shipped' }
  ];

  wishlistItems = [
    { name: 'Organic Avocados', price: 5.99, image: 'avocado.jpg' },
    { name: 'Fresh Salmon Fillet', price: 12.99, image: 'salmon.jpg' },
    { name: 'Artisan Bread', price: 4.50, image: 'bread.jpg' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      firstName: [this.userData.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [this.userData.lastName, [Validators.required, Validators.minLength(2)]],
      email: [this.userData.email, [Validators.required, Validators.email]],
      phone: [this.userData.phone, [Validators.required, Validators.pattern('^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[0-9]{1,4}[-\\s.]?[0-9]{1,4}[-\\s.]?[0-9]{1,9}$')]],
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
      address: [this.userData.address, Validators.required],
      city: [this.userData.city, Validators.required],
      state: [this.userData.state, Validators.required],
      zipCode: [this.userData.zipCode, [Validators.required, Validators.pattern('^[0-9]{5}(-[0-9]{4})?$')]],
      deliveryInstructions: [this.userData.deliveryInstructions]
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.isEditing = false;
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    if (this.profileForm.valid) {
      this.userData = { ...this.userData, ...this.profileForm.value };
      this.isEditing = false;
      
      // Show success toast/notification
      this.showNotification('Profile updated successfully!', 'success');
    } else {
      this.markFormGroupTouched(this.profileForm);
      this.showNotification('Please check all fields correctly.', 'error');
    }
  }

  cancelEdit(): void {
    this.profileForm.patchValue(this.userData);
    this.isEditing = false;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    // Implement notification logic here
    console.log(`${type}: ${message}`);
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'delivered': return 'badge-success';
      case 'processing': return 'badge-warning';
      case 'shipped': return 'badge-info';
      default: return 'badge-secondary';
    }
  }

  // Getters
  get firstName() { return this.profileForm.get('firstName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get email() { return this.profileForm.get('email'); }
  get phone() { return this.profileForm.get('phone'); }
  get address() { return this.profileForm.get('address'); }
  get city() { return this.profileForm.get('city'); }
  get state() { return this.profileForm.get('state'); }
  get zipCode() { return this.profileForm.get('zipCode'); }
}