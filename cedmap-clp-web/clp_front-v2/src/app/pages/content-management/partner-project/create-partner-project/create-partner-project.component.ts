import { Component, OnInit } from '@angular/core';
import { CoreApiService } from "src/app/services/core-api.service";
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { HttpEventType } from "@angular/common/http";
import { FileService } from "src/app/services/file.service";

@Component({
  selector: 'app-create-partner-project',
  templateUrl: './create-partner-project.component.html',
  styleUrls: ['./create-partner-project.component.scss']
})
export class CreatePartnerProjectComponent implements OnInit {
  name: any;
  partnerName:any;
  image: any;
  image1: any;
  image2: any;
  image3: any;
  file: any;
  description: any;
  img_link:any;
  img_link1:any;
  img_link2:any;
  img_link3:any;
  file_link:any;
  selectedImage: File | null = null;
  selectedPdf: File | null = null; 
  partnerList: any[] = [];
  constructor(private api: CoreApiService, private router: Router,private fs: FileService) { }

  ngOnInit(): void {
    this.getPartnerList();

  }
  submit(frm: NgForm) {
    const f = frm.form;
    if (f.invalid) {
      alert("Please fill all the necessary details");
    } else {
      const formData = new FormData(); // Using FormData to handle file uploads

      // Append regular form fields to FormData
      formData.append('name', f.value.name);
      formData.append('description', f.value.description);
      formData.append('partnerName', f.value.partnerName);
      formData.append('youtubeVideoLink', f.value.youtubeVideoLink); // Add this line
      // Append image and PDF files if they are selected
      if (this.img_link) {
        formData.append('image', this.img_link);
      }
      if (this.img_link1) {
        formData.append('image1', this.img_link1);
      }
      if (this.img_link2) {
        formData.append('image2', this.img_link2);
      }
      if (this.img_link3) {
        formData.append('image3', this.img_link3);
      }

      if (this.file_link) {
        formData.append('file', this.file_link);
      }

      // Send the form data using the API service
      this.api.post("project", formData).subscribe((resp: any) => {
        if (resp) {
          console.log(resp);
          alert("project created successfully");
          this.router.navigate(["/content/partner-project-list"]);
        }
      });
    }
  }
  getPartnerList() {
    this.api.get("partner", {}).subscribe((resp: any) => {
      if (resp) {
        this.partnerList = resp.data; 
      }
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.img()
    }
  }
  onImageSelected1(event: any):void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.img1()
    }
  }
  onImageSelected2(event: any):void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.img2()
    }
  } onImageSelected3(event: any):void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.img3()
    }
  } 
 img() {
      if (this.selectedImage) {
        this.fs.uploadFile(this.selectedImage).subscribe((res: any) => {
          if (res.type == HttpEventType.Response) {
            const body: any = res.body;
            this.img_link = body.file.path;
            // this.as.successToast(res.msg)
          }
        });
      } else {
        alert("Select pdf");
      }
    }
    img1() {
      if (this.selectedImage) {
        this.fs.uploadFile(this.selectedImage).subscribe((res: any) => {
          if (res.type == HttpEventType.Response) {
            const body: any = res.body;
            this.img_link1 = body.file.path;
          }
        });
      } else {
        alert("Select pdf");
      }
    }
    img2() {
      if (this.selectedImage) {
        this.fs.uploadFile(this.selectedImage).subscribe((res: any) => {
          if (res.type == HttpEventType.Response) {
            const body: any = res.body;
            this.img_link2 = body.file.path;
          }
        });
      } else {
        alert("Select pdf");
      }
    }
    img3() {
      if (this.selectedImage) {
        this.fs.uploadFile(this.selectedImage).subscribe((res: any) => {
          if (res.type == HttpEventType.Response) {
            const body: any = res.body;
            this.img_link3 = body.file.path;
          }
        });
      } else {
        alert("Select pdf");
      }
    }
  onPdfSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedPdf = file;
      this.pdf()
    } else {
      alert("Please select a valid PDF file.");
    }
  }
   pdf() {
        if (this.selectedPdf) {
          this.fs.uploadFile(this.selectedPdf).subscribe((res: any) => {
            if (res.type == HttpEventType.Response) {
              const body: any = res.body;
              this.file_link = body.file.path;
              // this.as.successToast(res.msg)
            }
          });
        } else {
          alert("Select pdf");
        }
      }

}
