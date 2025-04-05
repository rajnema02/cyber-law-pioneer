import { Component, OnInit } from '@angular/core';
import { CoreApiService } from "src/app/services/core-api.service";
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { HttpEventType } from "@angular/common/http";
import { FileService } from "src/app/services/file.service";

@Component({
  selector: 'app-create-running-project',
  templateUrl: './create-running-project.component.html',
  styleUrls: ['./create-running-project.component.scss']
})
export class CreateRunningProjectComponent implements OnInit {
  name: any;
  image: any;
  file: any;
  description: any;
  service:any;
  img_link:any;
  file_link:any;
  selectedImage: File | null = null;
  selectedPdf: File | null = null; 
  constructor(private api: CoreApiService, private router: Router,private fs: FileService) { }

  ngOnInit(): void {
  }
  submit(frm: NgForm) {
    const f = frm.form;
    if (f.invalid) {
      alert("Please fill all the necessary details");
    } else {
      const formData = new FormData(); // Using FormData to handle file uploads

      formData.append('name', f.value.name);
      formData.append('description', f.value.description);
      if (this.img_link) {
        formData.append('image', this.img_link);
      }

      if (this.file_link) {
        formData.append('file', this.file_link);
      }

      // Send the form data using the API service
      this.api.post("runningProjects", formData).subscribe((resp: any) => {
        if (resp) {
          console.log(resp);
          alert("project created successfully");
          this.router.navigate(["/content/running-project-list"]);
        }
      });
    }
  }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.img()
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
