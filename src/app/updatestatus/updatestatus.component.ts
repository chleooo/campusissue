import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-updatestatus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './updatestatus.component.html',
  styleUrls: ['./updatestatus.component.scss']
})
export class UpdateStatusComponent implements OnInit {

  id: number = 0;
  report: any = null;
  selectedStatus: string = '';
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef   // ✅ ADD THIS
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);
    console.log('Route ID:', this.id);

    this.loadReport();
  }

  loadReport() {
    this.loading = true;

    this.api.getReportById(this.id).subscribe({
      next: (res: any) => {

        console.log('Fetched Report:', res);

        this.report = res;
        this.selectedStatus = res.status;

        this.loading = false;

        this.cdr.detectChanges(); // 🔥 FORCE UI UPDATE
      },

      error: (err) => {
        console.log(err);
        alert('Failed to load report');
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  setStatus(status: string) {
    this.selectedStatus = status;
  }

  save() {
    if (!this.selectedStatus) return;

    if (this.selectedStatus === 'Resolved') {
      this.api.deleteReport(this.id).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    } else {
      this.api.updateStatus(this.id, this.selectedStatus).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin']);
  }
}