import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private router: Router) {}

  goDashboard() {

    // CHECK TANAN FIELDS
    if (!this.email || !this.password || !this.role) {
      alert('Please fill all fields');
      return;
    }

    // ADMIN LOGIN
    if (
      this.role === 'admin' &&
      this.email === 'admin@gmail.com' &&
      this.password === 'admin123'
    ) {
      this.router.navigate(['/admin']);
    }

    // STUDENT LOGIN
    else if (this.role === 'student') {
      this.router.navigate(['/dashboard']);
    }

    // INVALID
    else {
      alert('Invalid admin credentials');
    }
  }
}