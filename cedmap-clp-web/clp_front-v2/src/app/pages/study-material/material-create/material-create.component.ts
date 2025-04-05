import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
import { FileService } from "src/app/services/file.service";

import { HttpEventType } from "@angular/common/http";
@Component({
  selector: "app-material-create",
  templateUrl: "./material-create.component.html",
  styleUrls: ["./material-create.component.scss"],
})
export class MaterialCreateComponent implements OnInit {
  course: any;
  inputInfo: boolean = false;
  fileInfo: boolean = false;
  pdfFile: any;
  pdf_link: String;
  fileType: any;
  frmData: {}
  course_type: any;
  courseList: any;

  constructor(
    private api: CoreApiService,
    private router: Router,
    private fs: FileService
  ) {
  }


  ngOnInit(): void {}
  getInput(evt:any) {
    // if(evt.target && evt.target.value == "ytLink") {}
    if (this.fileType == "ytLink") {
      console.log(this.fileType);

      this.fileInfo = true;
      this.inputInfo = true;
    } else if (this.fileType == "pdf") {
      this.inputInfo = false;
      this.fileInfo = true;
    }
  }

  uploadpdf(e: any) {
    if (e.target.files.length) {
      this.pdfFile = e.target.files[0];
      this.pdf();
    } else {
      this.pdfFile = null;
    }
  }
  pdf() {
    if (this.pdfFile) {
      this.fs.uploadFile(this.pdfFile).subscribe((res: any) => {
        if (res.type == HttpEventType.Response) {
          const body: any = res.body;
          this.pdf_link = body.file.path;
          // this.as.successToast(res.msg)
        }
      });
    } else {
      alert("Select pdf");
    }
  }

  getCourseList(evt: any){

    this.course_type = evt.target.value;

    this.api.get("course", {course_type: this.course_type}).subscribe((resp: any)=>{
      console.log(resp);
      this.courseList = resp.data;
    })
  }

  submit(frm: any) {
    if (frm.form.invalid) {
      alert("Please fill all the necessary details");
    } else {
      const f = frm.form.value;
      if (f.fileType == "ytLink") {
        this.frmData = {
          course_name: f.course_name,
          fileType: this.fileType,
          yt_link: f.yt_link,
          title: f.title,
          description: f.description,
        };
      } else if (f.fileType == "pdf") {
        this.frmData = {
          course_name: f.course_name,
          fileType: this.fileType,
          pdf_link: this.pdf_link,
          title: f.pdf_title,
          description: f.description,
        };

      } else if (f.fileType == "video") {
        this.frmData = {
          course_name: f.course_name,
          fileType: this.fileType,
          video_link: this.pdf_link,
          title: f.pdf_title,
          description: f.description,
        };
      }
      console.log("STUDY MATERIAL FORM DATA ",this.frmData);

      this.api.post("study", this.frmData).subscribe((resp: any) => {
        if (resp) {
          alert("Content Uploaded Successfully!!!");
          this.router.navigate(['/study/study-list'])
        }
      });
    }
  }
}
