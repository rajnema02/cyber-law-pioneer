import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-partner-service-desc-project',
  templateUrl: './list-partner-service-desc-project.component.html',
  styleUrls: ['./list-partner-service-desc-project.component.scss']
})
export class ListPartnerServiceDescProjectComponent implements OnInit {
  allData: any[] = [];

  constructor(
    private api: CoreApiService, 
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getPartnerServiceDescs();
  }

  getPartnerServiceDescs() {
    // Simple direct API call without parameters
    this.http.get('http://localhost:3001/partnerServiceDesc').subscribe((res: any) => {
      console.log('API Response:', res); // Debug log
      if (res && res.data) {
        this.allData = res.data;
        
        // Process file URLs if needed
        this.allData.forEach(item => {
          if (item.file) {
            // Make sure the file path is a complete URL
            if (!item.file.startsWith('http')) {
              item.file = 'http://localhost:3001/' + item.file;
            }
          }
        });
      } else {
        console.error('Invalid API response format:', res);
        this.allData = [];
      }
    }, error => {
      console.error('Error fetching data:', error);
      this.allData = [];
    });
  }

  edit(id: string) {
    this.router.navigate(['/content/create-partner-service-desc-project', id]);
  }

  delete(id: string) {
    if (confirm('Are you sure you want to delete this?')) {
      this.api.delete('partnerServiceDesc', id).subscribe(() => {
        alert('Deleted successfully');
        this.getPartnerServiceDescs();
      }, error => {
        console.error('Delete error:', error);
        alert('Error deleting record. Please try again.');
      });
    }
  }
}