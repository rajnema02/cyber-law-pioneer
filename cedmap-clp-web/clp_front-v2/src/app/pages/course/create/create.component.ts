import { HttpEventType } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
import { FileService } from "src/app/services/file.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent {
  pdfFile: any;
  course_content: any;
  constructor(
    private api: CoreApiService,
    private router: Router,
    private fs: FileService
  ) {}

  uploadContent(e: any) {
    console.log("Function Called", e.target.files.length);
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
          this.course_content = body.file.path;
          // this.as.successToast(res.msg)
        }
      });
    } else {
      alert("Select pdf");
    }
  }
  submit(frm: any) {
    if (frm.form.invalid) {
      alert("Please fill all the necessary details");
    } else {
      const f = frm.form.value;
      const frmData = {
        course_type: f.course_type,
        course_name: f.course_name,
        course_duration: f.course_duration,
        course_code: f.course_code,
        fees: f.fees,
        course_content: this.course_content,
        course_eligibilty: f.course_eligibilty,
      };
      this.api.post("course", frmData).subscribe((resp: any) => {
        if (resp) {
          alert("Course Created Successfully!!!");
          this.router.navigate(["/course/course-list"]);
        }
      });
    }
  }
}
