import { Component, OnInit } from '@angular/core';
import { CoreApiService } from "src/app/services/core-api.service";
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { HttpEventType } from "@angular/common/http";
import { FileService } from "src/app/services/file.service";


@Component({
  selector: 'app-create-service-home-project',
  templateUrl: './create-service-home-project.component.html',
  styleUrls: ['./create-service-home-project.component.scss']
})
export class CreateServiceHomeProjectComponent implements OnInit {
  name: any;
  serviceName: any;
  image: any;
  image1: any;
  image2: any;
  image3: any;
  file: any;
  description: any;
  img_link: any;
  img_link1: any;
  img_link2: any;
  img_link3: any;
  file_link: any;
  selectedImage: File | null = null;
  selectedPdf: File | null = null;
  serviceList: any[] = [];

  constructor(private api: CoreApiService, private router: Router, private fs: FileService) {}

  ngOnInit(): void {
    this.getServiceList();
  }

  submit(frm: NgForm) {
    const f = frm.form;
    if (f.invalid) {
      alert("Please fill all the necessary details");
    } else {
      const formData = new FormData();
      formData.append('name', f.value.name);
      formData.append('description', f.value.description);
      formData.append('serviceName', f.value.serviceName);

      if (this.img_link) formData.append('image', this.img_link);
      if (this.img_link1) formData.append('image1', this.img_link1);
      if (this.img_link2) formData.append('image2', this.img_link2);
      if (this.img_link3) formData.append('image3', this.img_link3);
      if (this.file_link) formData.append('file', this.file_link);

      this.api.post("serviceProject", formData).subscribe((resp: any) => {
        if (resp) {
          console.log(resp);
          alert("Service Home Project created successfully");
          this.router.navigate(["/content/service-project-list"]);
        }
      });
    }
  }

  getServiceList() {
    this.api.get("service", {}).subscribe((resp: any) => {
      if (resp) {
        this.serviceList = resp.data;
      }
    });
  }

  onImageSelected(event: any) {
    this.uploadImage(event, (link: string) => this.img_link = link);
  }

  onImageSelected1(event: any) {
    this.uploadImage(event, (link: string) => this.img_link1 = link);
  }

  onImageSelected2(event: any) {
    this.uploadImage(event, (link: string) => this.img_link2 = link);
  }

  onImageSelected3(event: any) {
    this.uploadImage(event, (link: string) => this.img_link3 = link);
  }

  uploadImage(event: any, callback: (link: string) => void) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.fs.uploadFile(this.selectedImage).subscribe((res: any) => {
        if (res.type === HttpEventType.Response) {
          const body: any = res.body;
          callback(body.file.path);
        }
      });
    } else {
      alert("Select an image file.");
    }
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
    if (this.selectedPdf) {
      this.fs.uploadFile(this.selectedPdf).subscribe((res: any) => {
        if (res.type === HttpEventType.Response) {
          const body: any = res.body;
          this.file_link = body.file.path;
        }
      });
    } else {
      alert("Select a PDF file.");
    }
  }
}

