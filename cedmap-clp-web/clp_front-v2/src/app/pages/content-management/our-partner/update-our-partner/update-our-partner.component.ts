import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';
import { FileService } from 'src/app/services/file.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-update-our-partner',
  templateUrl: './update-our-partner.component.html',
  styleUrls: ['./update-our-partner.component.scss']
})
export class UpdateOurPartnerComponent implements OnInit {
  id = '';
  name = '';
  image_link = '';
  file_link = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: CoreApiService,
    private fs: FileService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.getPartnerDetail();
    }
  }
  getPartnerDetail(): void {
    this.api.getById("partner", this.id).subscribe({
      next: (resp: any) => {
        console.log("API Response:", resp); // Debugging: Log full response
  
        if (resp) {
          const data = resp.data || resp; // If response is not wrapped in `data`, use direct response
          this.name = data.name || '';
          this.image_link = data.image ? `https://cyberlawpioneers.org/file/download/${data.image}` : '';
          this.file_link = data.file ? `https://cyberlawpioneers.org/file/download/${data.file}` : '';
        }
      },
      error: (error) => {
        console.error("Error fetching partner details:", error);
        alert("Error fetching partner details");
      }
    });
  }
  

  submit(): void {
    if (!this.name) {
      alert("Please enter the partner name");
      return;
    }

    const body = {
      name: this.name,
      image: this.image_link,
      file: this.file_link
    };

    this.api.put("partner", this.id, body).subscribe({
      next: () => {
        alert("Partner updated successfully");
        this.router.navigate(["/content/our-partner-list"]);
      },
      error: () => alert("Update failed")
    });
  }

  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fs.uploadFile(file).subscribe({
        next: (res: any) => {
          if (res.type === HttpEventType.Response) {
            this.image_link = `https://cyberlawpioneers.org/file/download/${res.body.file.path}`;
          }
        },
        error: () => alert("Image upload failed")
      });
    }
  }

  handleFileUpload(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.fs.uploadFile(file).subscribe({
        next: (res: any) => {
          if (res.type === HttpEventType.Response) {
            this.file_link = `https://cyberlawpioneers.org/file/download/${res.body.file.path}`;
          }
        },
        error: () => alert("File upload failed")
      });
    } else {
      alert("Please upload a valid PDF file");
    }
  }
}
