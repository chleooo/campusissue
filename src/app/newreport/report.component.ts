import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-new-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class NewReportComponent {

  headline = '';
  category = 'Facilities';
  location = '';
  description = '';

  constructor(private router: Router, private api: ApiService) {}

  submitReport() {
    const user = this.api.getUser();

    if (!user) {
      alert('Session expired. Please login again.');
      this.router.navigate(['/']);
      return;
    }

    if (!this.headline || !this.location || !this.description) {
      alert('Please fill in all fields.');
      return;
    }

    const report = {
      headline: this.headline,
      category: this.category,
      location: this.location,
      description: this.description,
      postedBy: user.fullName,
      userId: user.id
    };

    console.log('Submitting:', report);

    this.api.createReport(report).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate(['/submit']);
      } else {
        alert('Failed: ' + (res.message || 'Unknown error'));
      }
    });
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}