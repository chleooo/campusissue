import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit',
  standalone: true,
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent {

  trackingId: string = '';

  constructor(private router: Router) {
    this.generateTrackingId();
  }

  // generate random tracking ID
  generateTrackingId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '#';

    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    this.trackingId = id;
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  newReport() {
    this.router.navigate(['/new-report']); // make sure same sa routes
  }
}