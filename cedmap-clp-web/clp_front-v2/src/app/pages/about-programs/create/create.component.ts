import { HttpEventType } from "@angular/common/http";

import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
import { FileService } from "src/app/services/file.service";
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  title: string = "";
  file: any;
  file_link: string = ""

  constructor(
    private apiService: CoreApiService,
    private fs: FileService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  uploadFile(e: any) {
    if (e.target.files.length) {
      this.file = e.target.files[0];
      console.log('file',this.file);
      
      this.uploadToServer()
    } else {
      this.file = null;
    }
  }
  uploadToServer() {
    if (this.file) {
      this.fs.uploadFile(this.file).subscribe((res: any) => {
        if (res.type == HttpEventType.Response) {
          const body: any = res.body;
          this.file_link = body.file.path;
        console.log(this.file_link);
                }
      });
    } else {
      alert("Select pdf");
    }
  }

  onCreateButtonClick(frm: NgForm) {
    if (frm.form.invalid) {
      alert("Please fill all the necessary details");
    } else {
      this.apiService.post("about-program", {
        title: this.title,
        file: this.file_link        
      }).subscribe((resp: any) => {
        if (resp) {
          alert("Content Uploaded Successfully!!!");
          this.router.navigate(['/about/program-list'])
        }
      });
    }
  }
}
