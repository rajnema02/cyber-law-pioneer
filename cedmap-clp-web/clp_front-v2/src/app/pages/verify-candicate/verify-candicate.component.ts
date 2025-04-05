import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { CoreApiService } from "src/app/services/core-api.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-verify-candicate",
  templateUrl: "./verify-candicate.component.html",
  styleUrls: ["./verify-candicate.component.scss"],
})
export class VerifyCandicateComponent implements OnInit {
  env: { production: boolean; url: string };
  cadEmail: any;
  page = 1;
  is_inactive = false;
  limit = 20;
  user: any;
  listCount: any;
  newIndex: any = 0;
  cadMobile: any;
  cadId: any;
  batch: any;
  endBatchDate: Date;

  constructor(
    private api: CoreApiService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.env = environment;
    this.route.params.subscribe((param: any) => {
      this.cadId = param.id;
      // this.cadEmail = param.email
      // this.cadMobile = param.mobile
      // const queryData = {
      //   page: this.page,
      //   limit: this.limit,
      //   is_inactive: this.is_inactive,
      //   role: "user",
      //   email: this.cadEmail,
      //   mobile: this.cadMobile
      // }

      this.api.getById("user/verifyById", this.cadId).subscribe((resp: any) => {
        if (resp) {
          this.user = resp;
          // console.log("CADIDATE DETAIL", this.user);

          if (this.user.batch) {
            this.api
              .getById("batch/verifyById", this.user.batch)
              .subscribe((resp: any) => {
                if (resp) {
                  this.endBatchDate = new Date(resp.endDate);
                  const currentDate = new Date();
                  if (
                    this.endBatchDate.getDate() - currentDate.getDate() <=
                    0
                  ) {
                    this.batch = resp;
                    console.log("END-DATE>>>>", this.endBatchDate.getDate());
                    console.log("CURRENT-DATE>>>>", currentDate.getDate());
                    console.log("CADIDATE Batch DETAIL", resp);
                  } else {
                    alert("Records not Found!!!!");
                    router.navigate(["/"]);
                  }
                }
              });
          } else {
            if(!this.user.is_profileVerified){
              if (confirm("User not verified yet!!!!")) {
                this.router.navigate(["/"]);
              } else {
                this.router.navigate(["/"]);
              }
            }else{
              if (confirm("Records not Found!!!!")) {
                this.router.navigate(["/"]);
              } else {
                this.router.navigate(["/"]);
              }

            }
          }
        } else {
          if (confirm("Records not Found!!!!")) {
            this.router.navigate(["/"]);
          } else {
            this.router.navigate(["/"]);
          }
        }
      });
    });
  }

  ngOnInit(): void {}
}
