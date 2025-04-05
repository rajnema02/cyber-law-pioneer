import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';
import { FileService } from 'src/app/services/file.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-update-service-details',
  templateUrl: './update-service-details.component.html',
  styleUrls: ['./update-service-details.component.scss']
})
export class UpdateServiceDetailsComponent implements OnInit {
  id = '';
  name = '';
  serviceName = '';
  description = '';
  img_link1 = '';
  img_link2 = '';
  img_link3 = '';
  img_link4 = '';
  file_link = '';
  serviceList: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: CoreApiService,
    private fs: FileService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.getServiceDetail();
    }
    this.getServiceList();
  }

  getServiceDetail(): void {
    this.api.getById("servicedetail", this.id).subscribe({
      next: (resp: any) => {
        const data = resp.data;
        this.name = data.name;
        this.description = data.description;
        this.serviceName = data.serviceName;
        this.img_link1 = data.image1;
        this.img_link2 = data.image2;
        this.img_link3 = data.image3;
        this.img_link4 = data.image4;
        this.file_link = data.file;
      },
      error: () => alert('Error fetching service details')
    });
  }

  getServiceList(): void {
    this.api.get("service", {}).subscribe({
      next: (resp: any) => {
        this.serviceList = resp.data;
      },
      error: () => alert('Error loading services')
    });
  }

  submit(): void {
    if (!this.name || !this.description || !this.serviceName) {
      alert("Please fill all required fields");
      return;
    }

    const body = {
      name: this.name,
      description: this.description,
      serviceName: this.serviceName,
      image1: this.img_link1,
      image2: this.img_link2,
      image3: this.img_link3,
      image4: this.img_link4,
      file: this.file_link
    };

    this.api.put("servicedetail", this.id, body).subscribe({
      next: () => {
        alert("Service updated successfully");
        this.router.navigate(["/content/service-details-list"]);
      },
      error: () => alert("Update failed")
    });
  }

  handleImageUpload(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.fs.uploadFile(file).subscribe({
        next: (res: any) => {
          if (res.type === HttpEventType.Response) {
            const path = res.body.file.path;
            if (index === 1) this.img_link1 = path;
            if (index === 2) this.img_link2 = path;
            if (index === 3) this.img_link3 = path;
            if (index === 4) this.img_link4 = path;
          }
        },
        error: () => alert("Image upload failed")
      });
    }
  }

  handlePdfUpload(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.fs.uploadFile(file).subscribe({
        next: (res: any) => {
          if (res.type === HttpEventType.Response) {
            this.file_link = res.body.file.path;
          }
        },
        error: () => alert("PDF upload failed")
      });
    } else {
      alert("Please upload a valid PDF file");
    }
  }
}
