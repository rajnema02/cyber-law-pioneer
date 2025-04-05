import { Component, OnInit } from '@angular/core';
import { CoreApiService } from "src/app/services/core-api.service";
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { HttpEventType } from "@angular/common/http";
import { FileService } from "src/app/services/file.service";

@Component({
  selector: 'app-create-team-detail',
  templateUrl: './create-team-detail.component.html',
  styleUrls: ['./create-team-detail.component.scss']
})
export class CreateTeamDetailComponent implements OnInit {
  name: any;
  image: any;
  post: any;
  description: any;
  selectedImage: File | null = null;
  file_link: any;
  constructor(private api: CoreApiService, private router: Router, private fs: FileService,) {}

  ngOnInit(): void {
  }
  submit(frm: NgForm) {
    const f = frm.form;
    if (f.invalid) {
      alert("Please fill all the necessary details");
    } else {
      const formData = {
        name: f.value.name,
        image: this.file_link,
        post: f.value.post,
        description: f.value.description,
      };
      
      this.api.post("teamDetails", formData).subscribe((resp: any) => {
        if (resp) {
          console.log(resp);
          alert("Team Details added successfully");
          this.router.navigate(["/content/team-detail-list"]);
        }
      });
    }
  }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.pdf()
    }
  }
  pdf() {
      if (this.selectedImage) {
        this.fs.uploadFile(this.selectedImage).subscribe((res: any) => {
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
