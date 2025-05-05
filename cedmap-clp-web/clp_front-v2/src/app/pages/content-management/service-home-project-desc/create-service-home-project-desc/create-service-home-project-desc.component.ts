import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';
import { FileService } from 'src/app/services/file.service';
import { HttpEventType } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-service-home-project-desc',
  templateUrl: './create-service-home-project-desc.component.html',
  styleUrls: ['./create-service-home-project-desc.component.scss']
})
export class CreateServiceHomeProjectDescComponent implements OnInit {
  id: string | null = null;
  allServices: any[] = [];
  allProjects: any[] = [];
  filteredProjects: any[] = [];

  // Form fields
  name: any;
  description: any;
  serviceId: any;
  serviceProjectId: any;

  // File fields
  img_link: any;
  img_link1: any;
  img_link2: any;
  img_link3: any;
  file_link: any;

  selectedImage: File | null = null;
  selectedPdf: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: CoreApiService,
    private fs: FileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadServices();
    this.loadProjects();
    
    if (this.id) {
      this.loadExistingRecord();
    }
  }

  loadServices() {
    this.api.get('service', {}).subscribe((resp: any) => {
      this.allServices = resp?.data || [];
    });
  }

  loadProjects() {
    this.api.get('serviceProject', {}).subscribe((resp: any) => {
      this.allProjects = resp?.data || [];
      this.filterProjects();
    });
  }

  loadExistingRecord() {
    this.api.getById('serviceProjectDesc', this.id!).subscribe((resp: any) => {
      const data = resp?.data;
      this.name = data?.name;
      this.description = data?.description;
      this.serviceId = data?.serviceId?._id || data?.serviceId;
      this.serviceProjectId = data?.serviceProjectId?._id || data?.serviceProjectId;
      
      // Load images
      this.img_link = data?.image;
      this.img_link1 = data?.image1;
      this.img_link2 = data?.image2;
      this.img_link3 = data?.image3;
      this.file_link = data?.file;

      // Filter projects based on the serviceId from existing record
      this.filterProjects();
    });
  }

  onServiceChange(event: any) {
    this.serviceId = event.target.value;
    this.serviceProjectId = null; // Reset project selection when service changes
    this.filterProjects();
  }

  filterProjects() {
    if (this.serviceId) {
      this.filteredProjects = this.allProjects.filter(
        project => project.serviceId === this.serviceId
      );
    } else {
      this.filteredProjects = [];
    }
  }

  getImageByIndex(index: number): string | null {
    switch (index) {
      case 0: return this.img_link;
      case 1: return this.img_link1;
      case 2: return this.img_link2;
      case 3: return this.img_link3;
      default: return null;
    }
  }

  submit(frm: NgForm) {
    const f = frm.form;
    if (f.invalid) {
      alert('Please fill all the necessary details');
      return;
    }

    const formData = new FormData();
    formData.append('name', f.value.name);
    formData.append('description', f.value.description);
    formData.append('serviceId', f.value.serviceId);
    formData.append('serviceProjectId', f.value.serviceProjectId);

    // Append files if they exist
    if (this.img_link instanceof File) formData.append('image', this.img_link);
    if (this.img_link1 instanceof File) formData.append('image1', this.img_link1);
    if (this.img_link2 instanceof File) formData.append('image2', this.img_link2);
    if (this.img_link3 instanceof File) formData.append('image3', this.img_link3);
    if (this.file_link instanceof File) formData.append('file', this.file_link);

    if (this.id) {
      this.api.put('serviceProjectDesc', this.id, formData).subscribe({
        next: () => {
          alert('Service Home Description updated successfully');
          this.router.navigate(['/content/service-project-desc-list']);
        },
        error: (err) => {
          console.error('Update error:', err);
          alert('Error updating record');
        }
      });
    } else {
      this.api.post('serviceProjectDesc', formData).subscribe({
        next: () => {
          alert('Service Home Description created successfully');
          this.router.navigate(['/content/service-project-desc-list']);
        },
        error: (err) => {
          console.error('Create error:', err);
          alert('Error creating record');
        }
      });
    }
  }

  handleImageUpload(event: any, index: number) {
    const file = event.target.files[0];
    if (!file) return;

    this.fs.uploadFile(file).subscribe((res: any) => {
      if (res.type === HttpEventType.Response) {
        const path = res.body.file.path;
        switch (index) {
          case 0: this.img_link = path; break;
          case 1: this.img_link1 = path; break;
          case 2: this.img_link2 = path; break;
          case 3: this.img_link3 = path; break;
        }
      }
    });
  }

  onPdfSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.fs.uploadFile(file).subscribe((res: any) => {
        if (res.type === HttpEventType.Response) {
          this.file_link = res.body.file.path;
        }
      });
    } else {
      alert('Please select a valid PDF file.');
    }
  }
}