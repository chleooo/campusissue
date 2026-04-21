import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = '';
  password = '';
  role = '';

  constructor(private router: Router, private api: ApiService) {}

  goDashboard() {
    if (!this.email || !this.password) {
      alert('Please fill all fields.');
      return;
    }

    // ✅ Only allow @liceo.edu.ph emails
    if (!this.email.toLowerCase().endsWith('@liceo.edu.ph')) {
      alert('Only @liceo.edu.ph email addresses are allowed.');
      return;
    }

    this.api.login({ email: this.email, password: this.password }).subscribe((res: any) => {
      if (res.success) {
        this.api.setUser(res.user);
        if (res.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      } else {
        alert('Invalid email or password.');
      }
    });
  }
}