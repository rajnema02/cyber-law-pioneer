import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-student-id",
  templateUrl: "./student-id.component.html",
  styleUrls: ["./student-id.component.scss"],
})
export class StudentIdComponent implements OnInit {
  user_id: any;
  user: any;
  profileVerified: any;
  batch: any;
  env: { production: boolean; url: string };

  constructor(
    private api: CoreApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.env = environment;
    this.route.params.subscribe((event) => {
      if (event.id) {
        this.user_id = event.id;
        if (this.user_id) {
          this.api.getById("user", this.user_id).subscribe((resp: any) => {
            this.user = resp;
            this.profileVerified = resp.profile_verify;
            // console.log(resp);
            if (this.profileVerified) {
              this.api
                .getById("batch", this.user.batch)
                .subscribe((resp: any) => {
                  this.batch = resp;
                  console.log("BATCH DATA>>>>>>>>>>", resp);
                });
            }
          });
        }
      } else {
        const user = JSON.parse(localStorage.getItem("user"));
        this.user_id = user.id;
        this.profileVerified = user.profile_verify;
        if (this.profileVerified) {
          this.api.getById("user", this.user_id).subscribe((resp: any) => {
            this.user = resp;
            this.api
              .getById("batch", this.user.batch)
              .subscribe((resp: any) => {
                this.batch = resp;
                console.log("BATCH DATA>>>>>>>>>>", resp);
              });
          });
        } else {
          alert("Your ID card not generated yet!!!");
          router.navigate(["/dashboard"]);
        }
      }
    });
  }

  ngOnInit(): void {}
  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();
    // window.removeEventListener("", this.print);

    // document.body.innerHTML = originalContents;
  }
}
