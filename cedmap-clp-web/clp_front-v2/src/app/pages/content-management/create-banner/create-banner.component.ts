import { Component, OnInit } from '@angular/core';
import { CoreApiService } from "src/app/services/core-api.service";
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { HttpEventType } from "@angular/common/http";
import { FileService } from "src/app/services/file.service";

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: ['./create-banner.component.scss']
})
export class CreateBannerComponent implements OnInit {
  image: any;
  img_link:any;
  selectedImage: File | null = null;
  constructor(private api: CoreApiService, private router: Router,private fs: FileService) { }

  ngOnInit(): void {
  }
  submit(frm: NgForm) {
    const f = frm.form;
    if (f.invalid) {
      alert("Please fill all the necessary details");
    } else {
      const formData = {
        
        image: this.img_link
      };
      console.log(formData);
      this.api.post("banner", formData).subscribe((resp: any) => {
        if (resp) {
          console.log(resp);
          alert("banner added successfully");
          this.router.navigate(["/content/banner-list"]);
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
}