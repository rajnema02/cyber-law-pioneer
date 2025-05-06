import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';

@Component({
  selector: 'app-landing-services',
  templateUrl: './landing-services.component.html',
  styleUrls: ['./landing-services.component.scss', './base.css'],
})
export class LandingServicesComponent implements OnInit {
  serviceList: any[] = [];
  isLoading: boolean = true;

  constructor(private api: CoreApiService, private router: Router) {}

  ngOnInit(): void {
    this.getServiceList();
  }

  getServiceList(): void {
    this.api.get('service', {}).subscribe({
      next: (resp: any) => {
        console.log('API Response:', resp); // <- Debug this
        this.serviceList = resp?.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching services:', err);
        this.isLoading = false;
      }
    });
  }
  

  redirectToService(serviceId: string): void {
    if (serviceId) {
      this.router.navigate(['/services-project', serviceId]);
    } else {
      console.warn('Service ID is invalid');
    }
  }
}
