import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  reports: any[] = [];
  filteredReports: any[] = [];
  activeFilter = 'All';
  user: any;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.user = this.api.getUser();
    if (!this.user) { this.router.navigate(['/']); return; }
    this.loadReports();
  }

  loadReports() {
    const uid = Number(this.user.id);
    this.api.getUserReports(uid).subscribe({
      next: (res: any) => {
        this.reports = Array.isArray(res) ? res : [];
        this.applyFilter();
      },
      error: () => { this.reports = []; this.filteredReports = []; }
    });
  }

  applyFilter() {
    this.filteredReports = this.activeFilter === 'All'
      ? [...this.reports]
      : this.reports.filter(r => r.category === this.activeFilter);
  }

  filterReports(cat: string) {
    this.activeFilter = cat;
    this.applyFilter();
  }

  goNewReport() { this.router.navigate(['/new-report']); }
  goProfile()   { this.router.navigate(['/edit-profile']); }
  logout()      { this.api.logout(); this.router.navigate(['/']); }
}