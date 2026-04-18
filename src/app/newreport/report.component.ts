import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class NewReportComponent {

  // form fields
  headline: string = '';
  category: string = 'Facilities';
  priority: string = 'Personal';
  location: string = '';
  description: string = '';
  anonymous: boolean = false;
  name: string = '';

  constructor(private router: Router) {}

  submitReport() {

    // validation
    if (!this.headline || !this.location || !this.description) {
      alert('Please fill in all required fields');
      return;
    }
    this.router.navigate(['/submit']);

    const report = {
      headline: this.headline,
      category: this.category,
      priority: this.priority,
      location: this.location,
      description: this.description,
      postedBy: this.anonymous ? 'Anonymous' : this.name,
      date: new Date()
    };

    console.log(report);
    alert('Report submitted successfully!');
    this.router.navigate(['/dashboard']);
  }
  cancel() {
    this.router.navigate(['/dashboard']);
  }
}