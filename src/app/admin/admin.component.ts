import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  reports: any[] = [];
  filteredReports: any[] = [];
  activeFilter = 'All';
  user: any;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.api.getUser();

    if (!this.user) {
      this.router.navigate(['/']);
      return;
    }

    this.loadReports();
  }

  loadReports() {
    this.api.getReports().subscribe({
      next: (res: any) => {
        this.reports = Array.isArray(res) ? res : [];
        this.applyFilter();
      },
      error: (err) => {
        console.error('Failed to load reports', err);
        this.reports = [];
      }
    });
  }

  applyFilter() {
    this.filteredReports =
      this.activeFilter === 'All'
        ? [...this.reports]
        : this.reports.filter(r => r.category === this.activeFilter);
  }

  filterReports(cat: string) {
    this.activeFilter = cat;
    this.applyFilter();
  }

  // ✅ THIS IS CORRECT NAVIGATION
  goStatus(report: any) {
    this.router.navigate(['/update-status', report.id]);
  }

  deleteReport(id: number) {
    if (!confirm('Delete this report?')) return;

    this.reports = this.reports.filter(r => r.id !== id);
    this.applyFilter();

    this.api.deleteReport(id).subscribe({
      error: () => {
        alert('Delete failed');
        this.loadReports();
      }
    });
  }

  goProfile() {
    this.router.navigate(['/edit-profile']);
  }

  logout() {
    this.api.logout();
    this.router.navigate(['/']);
  }
}