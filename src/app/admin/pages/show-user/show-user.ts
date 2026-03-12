import { NgFor, CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user-service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../search-pipe-pipe';

@Component({
  selector: 'app-show-user',
  standalone: true,
  imports: [NgFor, FormsModule, SearchPipe, CommonModule, DatePipe],
  templateUrl: './show-user.html',
  styleUrl: './show-user.css',
})
export class ShowUser implements OnInit {
  users: any[] = [];
  searchText: string = '';

  constructor(private cdr: ChangeDetectorRef, private uService: UserService) {}

  ngOnInit() {
    this.loadUser();
    
    // Test with hardcoded data
    setTimeout(() => {
      if (this.users.length === 0) {
        console.log('No users from API, using test data');
        this.users = [
          {
            _id: '1',
            username: 'dhyani',
            email: 'dhyani@gmail.com',
            mobileno: '9016563087',
            createdAt: new Date()
          },
          {
            _id: '2',
            username: 'khushi',
            email: 'khushi@gmail.com',
            mobileno: '9925871373',
            createdAt: new Date()
          }
        ];
        this.cdr.detectChanges();
      }
    }, 2000);
  }

  loadUser() {
    console.log('Loading users...');
    this.uService.get().subscribe({
      next: (res: any) => {
        console.log('Users response:', res);
        this.users = res.data || [];
        console.log('Users array:', this.users);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log('Error loading users:', err);
        alert('Failed to load users. Please check if backend is running.');
      },
    });
  }

  viewUser(user: any) {
    alert(`User Details:\n\nName: ${user.username}\nEmail: ${user.email}\nMobile: ${user.mobileno}\nRegistered: ${new Date(user.createdAt).toLocaleDateString()}`);
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.uService.deleteUser(userId).subscribe({
        next: (res: any) => {
          alert('User deleted successfully!');
          this.loadUser(); // Reload users
        },
        error: (err: any) => {
          console.log('Error deleting user:', err);
          alert('Failed to delete user.');
        },
      });
    }
  }
}
