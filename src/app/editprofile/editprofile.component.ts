import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditProfileComponent {

  user: any = null;
  fullName = '';
  password = '';
  confirmPassword = '';
  course = '';
  year = '';
  isAdmin = false;

  constructor(private api: ApiService, private router: Router) {
    this.user = this.api.getUser();
    if (!this.user) { this.router.navigate(['/']); return; }
    this.fullName = this.user.fullName || '';
    this.course   = this.user.course || '';
    this.year     = this.user.year || '';
    this.isAdmin  = this.user.role === 'admin';
  }

  save() {
    if (!this.fullName) { alert('Name cannot be empty.'); return; }
    if (this.password && this.password !== this.confirmPassword) { alert('Passwords do not match.'); return; }

    this.api.updateProfile(this.user.id, {
      fullName: this.fullName,
      password: this.password || this.user.password,
      course: this.course,
      year: this.year
    }).subscribe((res: any) => {
      if (res.success) {
        this.api.setUser({ ...this.user, fullName: this.fullName, course: this.course, year: this.year });
        alert('Profile updated!');
        this.router.navigate([this.isAdmin ? '/admin' : '/dashboard']);
      } else {
        alert('Update failed: ' + (res.message || 'Unknown error'));
      }
    });
  }

  cancel() { this.router.navigate([this.isAdmin ? '/admin' : '/dashboard']); }
}