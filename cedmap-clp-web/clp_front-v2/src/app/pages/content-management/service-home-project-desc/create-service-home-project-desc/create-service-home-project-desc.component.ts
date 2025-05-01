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

  name: any;
  description: any;
  serviceId: any;

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

    // Fetch all services
    this.api.get('service', {}).subscribe((resp: any) => {
      this.allServices = resp?.data;
    });

    // Fetch service home desc if updating
    if (this.id) {
      this.api.getById('serviceHomeDesc', this.id).subscribe((resp: any) => {
        const data = resp?.data;
        this.name = data?.name;
        this.description = data?.description;
        this.serviceId = data?.serviceId?._id;
        this.img_link = data?.image;
        this.img_link1 = data?.image1;
        this.img_link2 = data?.image2;
        this.img_link3 = data?.image3;
        this.file_link = data?.file;
      });
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

    if (this.img_link) formData.append('image', this.img_link);
    if (this.img_link1) formData.append('image1', this.img_link1);
    if (this.img_link2) formData.append('image2', this.img_link2);
    if (this.img_link3) formData.append('image3', this.img_link3);
    if (this.file_link) formData.append('file', this.file_link);

    if (this.id) {
      this.api.put('serviceHomeDesc', this.id, formData).subscribe((resp: any) => {
        alert('Service Home Description updated successfully');
        this.router.navigate(['/content/service-home-desc-list']);
      });
    } else {
      this.api.post('serviceHomeDesc', formData).subscribe((resp: any) => {
        alert('Service Home Description created successfully');
        this.router.navigate(['/content/service-home-desc-list']);
      });
    }
  }

  handleImageUpload(event: any, index: number) {
    const file = event.target.files[0];
    if (!file) return;
    this.selectedImage = file;
    this.fs.uploadFile(this.selectedImage).subscribe((res: any) => {
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
      this.selectedPdf = file;
      this.fs.uploadFile(this.selectedPdf).subscribe((res: any) => {
        if (res.type === HttpEventType.Response) {
          this.file_link = res.body.file.path;
        }
      });
    } else {
      alert('Please select a valid PDF file.');
    }
  }
}



