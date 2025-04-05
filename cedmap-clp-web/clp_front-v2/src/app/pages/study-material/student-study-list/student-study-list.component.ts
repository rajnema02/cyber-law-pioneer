import { Component, OnInit } from "@angular/core";
import { CoreApiService } from "src/app/services/core-api.service";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-student-study-list",
  templateUrl: "./student-study-list.component.html",
  styleUrls: ["./student-study-list.component.scss"],
})
export class StudentStudyListComponent implements OnInit {
  videoList: any;
  apiLoaded = false;
  safeUrl: any;
  user: any;
  env: any;
  userDetail: any;
  formStatus: any;
  profile_verify: any;
  courseCode: any;
  constructor(private api: CoreApiService, private _sanitizer: DomSanitizer) {
    this.env = environment;
    this.user = JSON.parse(localStorage.getItem("user" || "{}"));
    this.getUser()
    // if (this.user.profile_verify) {
    //   this.getCourseList();
    // }
  }


  getUser() {
    this.api.getById("user", this.user.id).subscribe((resp: any) => {
      if (resp) {
        this.userDetail = resp;
        console.log(this.userDetail);

        this.formStatus = resp.formStatus;
        let splitResult = resp.course_code.split("-");
        this.courseCode = splitResult[0]
        this.profile_verify = resp.is_profileVerified;
        if (this.profile_verify) {
          this.getCourseList();
        }
      }
    });
  }
  makeSafeVideo(videoUrl: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  getCourseList() {
    // if (!this.user.profile_verify) {
    //   alert("You already submitted this form!");
    //   this.router.navigate(["/dashboard"]);
    // }
    this.api.get("study", {
      course_name
        : this.courseCode
    }).subscribe((resp: any) => {
      if (resp) {
        console.log(resp);

        this.videoList = resp.data.map((o) => {
          o.yt_link = this.makeSafeVideo(o.yt_link);
          return o;
        });
      }
    });
  }
  ngOnInit(): void { }
}
