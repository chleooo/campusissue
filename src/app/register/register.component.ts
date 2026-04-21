import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  course = '';
  year = '';

  constructor(private router: Router, private api: ApiService) {}

  createAccount() {
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword || !this.course || !this.year) {
      alert('Please fill all fields.');
      return;
    }

    if (!this.email.toLowerCase().endsWith('@liceo.edu.ph')) {
      alert('Only @liceo.edu.ph email addresses are allowed.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    this.api.register({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      course: this.course,
      year: this.year
    }).subscribe((res: any) => {
      if (res.success) {
        alert('Account created successfully!');
        this.router.navigate(['/']);
      } else {
        alert('Registration failed: ' + (res.message || 'Email may already be taken.'));
      }
    });
  }
}