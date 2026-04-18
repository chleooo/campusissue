import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) {}

  reports: any[] = [
    {
      name: 'John Doe',
      category: 'Facilities',
      desc: 'Broken AC in Room 302',
      location: 'Engineering Building',
      priority: 'Public',
      status: 'In Progress',
      date: '1/24/2026'
    },
    {
      name: 'Anonymous',
      category: 'Safety',
      desc: 'Faulty Wiring in Hallway',
      location: 'Main Cafeteria',
      priority: 'Urgent',
      status: 'Resolved',
      date: '1/24/2026'
    }
  ];

  filteredReports: any[] = [];
  activeFilter: string = 'All';

  ngOnInit() {
    this.filteredReports = this.reports;
  }

  filterReports(category: string) {
    this.activeFilter = category;

    if (category === 'All') {
      this.filteredReports = this.reports;
    } else {
      this.filteredReports = this.reports.filter(
        r => r.category === category
      );
    }
  }

  logout() {
    this.router.navigate(['/']);
  }
}