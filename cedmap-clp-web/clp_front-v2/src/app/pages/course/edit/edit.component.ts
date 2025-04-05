import { HttpEventType } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
import { FileService } from "src/app/services/file.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent {
  pdfFile: any;
  course_content: any;
  courseId: any;
  courseData: any;
  // courseData={
  //   course_name:"",
  //   course_code:"",
  //   course_type:"",
  //   course_duration:"",
  //   course_content:"",
  //   fees:"",
  //   description:"",
  // }
  constructor(
    private api: CoreApiService,
    private router: Router,
    private fs: FileService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param: any) => {
      this.courseId = param.id;
      if (this.courseId) {
        console.log(this.courseId);

        this.fetchCourse();
      }
    });
  }

  ngOnInit(): void {}

  fetchCourse() {
    this.api.getById("course", this.courseId).subscribe((resp: any) => {
      this.courseData = resp;
      // this.courseData.course_name =resp.course_name;
      // this.courseData.course_code =resp.course_code;
      // this.courseData.course_type =resp.course_type;
      // this.courseData.course_duration =resp.course_duration;
      // this.courseData.course_content =resp.course_content;
      // this.courseData.fees =resp.fees;
      // this.courseData.description =resp.description;
    });
  }

  uploadContent(e: any) {
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
        course_name: f.course_name,
        course_code: f.course_code,
        course_type: f.course_type,
        course_duration: f.course_duration,
        fees: f.fees,
        description: f.description,
      };
      this.api.put("course",this.courseId ,frmData).subscribe((resp: any) => {
        if (resp) {
          alert("Course Updated Successfully!!!");
          this.router.navigate(["/course/course-list"]);
        }
      });
    }
  }
}
