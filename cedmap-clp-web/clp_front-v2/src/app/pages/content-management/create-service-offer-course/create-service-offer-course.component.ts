import { Component, OnInit } from '@angular/core';
import { CoreApiService } from "src/app/services/core-api.service";
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { HttpEventType } from "@angular/common/http";
import { FileService } from "src/app/services/file.service";

@Component({
  selector: 'app-create-service-offer-course',
  templateUrl: './create-service-offer-course.component.html',
  styleUrls: ['./create-service-offer-course.component.scss']
})
export class CreateServiceOfferCourseComponent implements OnInit {
  programs: any[] = [];
  img_link: any;
  img_link1: any;
  img_link2: any;
  img_link3: any;
  file_link: any;
  selectedImage: File | null = null;
  selectedPdf: File | null = null;
  isLoading = false;

  constructor(
    private api: CoreApiService, 
    private router: Router,
    private fs: FileService
  ) {}

  ngOnInit(): void {}

  onServiceChange(event: any) {
    const service = event.target.value;
    if (service) {
      this.loadPrograms(service);
    } else {
      this.programs = [];
    }
  }

  loadPrograms(service: string) {
    this.isLoading = true;
    this.api.get("servicesOffers", { service, is_inactive: 'false' }).subscribe({
      next: (resp: any) => {
        this.programs = resp.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error loading programs:", err);
        this.isLoading = false;
      }
    });
  }

  submit(frm: NgForm) {
    const f = frm.form;
    if (f.invalid) {
      alert("Please fill all the required fields");
      return;
    }

    this.isLoading = true;
    const formData = new FormData();

    // Append form values
    formData.append('name', f.value.name);
    formData.append('service', f.value.service);
    formData.append('program', f.value.program);
    formData.append('description', f.value.description);
    if (f.value.googleFormLink) {
      formData.append('googleFormLink', f.value.googleFormLink);
    }

    if (f.value.youtubeLink) {
      formData.append('youtubeLink', f.value.youtubeLink);
    }

    // Append files if they exist
    if (this.img_link) formData.append('image', this.img_link);
    if (this.img_link1) formData.append('image1', this.img_link1);
    if (this.img_link2) formData.append('image2', this.img_link2);
    if (this.img_link3) formData.append('image3', this.img_link3);
    if (this.file_link) formData.append('file', this.file_link);

    this.api.post("servicesOffersCourses", formData).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        alert("Course created successfully");
        this.router.navigate(["/content/service-offers-course"]);
      },
      error: (err) => {
        this.isLoading = false;
        console.error("Error creating course:", err);
        alert("Error creating course. Please try again.");
      }
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.uploadImage(0);
    }
  }

  onImageSelected1(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.uploadImage(1);
    }
  }

  onImageSelected2(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.uploadImage(2);
    }
  }

  onImageSelected3(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.uploadImage(3);
    }
  }

  uploadImage(index: number) {
    if (!this.selectedImage) return;
    
    this.isLoading = true;
    this.fs.uploadFile(this.selectedImage).subscribe((res: any) => {
      if (res.type == HttpEventType.Response) {
        const path = res.body?.file?.path || res.body?.path;
        if (path) {
          switch(index) {
            case 0: this.img_link = path; break;
            case 1: this.img_link1 = path; break;
            case 2: this.img_link2 = path; break;
            case 3: this.img_link3 = path; break;
          }
        }
        this.isLoading = false;
      }
    }, (err) => {
      this.isLoading = false;
      console.error("Error uploading image:", err);
    });
  }

  onPdfSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedPdf = file;
      this.uploadPdf();
    } else {
      alert("Please select a valid PDF file.");
    }
  }

  uploadPdf() {
    if (!this.selectedPdf) return;
    
    this.isLoading = true;
    this.fs.uploadFile(this.selectedPdf).subscribe((res: any) => {
      if (res.type == HttpEventType.Response) {
        const path = res.body?.file?.path || res.body?.path;
        if (path) {
          this.file_link = path;
        }
        this.isLoading = false;
      }
    }, (err) => {
      this.isLoading = false;
      console.error("Error uploading PDF:", err);
    });
  }
}