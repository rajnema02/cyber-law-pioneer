import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"],
})
export class ForgetPasswordComponent implements OnInit {
  userId: any;
  user: any;
  name: any;
  userEmail: any;
  otpVerified: Boolean = false;
  verifyDetails: Boolean = false;
  userDetail: any;
  constructor(
    private api: CoreApiService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("Token");
    localStorage.removeItem("refershToken");
    // const users = JSON.parse(localStorage.getItem("user" || "{}"));
    // if (users || {}) {
    // } else {
    //   console.log("USSEEERRR___IIIDDD>>>", this.userId);
    // }
  }

  ngOnInit(): void {}
  getUser(id: any) {
    this.api.getById("user", id).subscribe((resp: any) => {
      if (resp) {
        this.userDetail = resp;
        // this.email = resp.email;
        // this.mobile = resp.mobile;

        // console.log(this.name, this.userEmail);
      }
    });
  }
  detailSubmit(frm: any) {
    const f = frm.value;
    // console.log(f);
    this.auth.forgetPassword(f).subscribe((resp: any) => {
      if (resp.success) {
        this.user = resp.user;
        this.userId = resp.user.id;
        console.log(resp);
        alert(resp.msg);
        this.verifyDetails = true;
        localStorage.setItem("token", resp.token);
        localStorage.setItem("user", JSON.stringify(resp));
        this.getUser(this.userId);
        const otpData = {
          email: this.user.email,
          mobile: this.user.mobile,
        };
        this.auth.sendOtp(otpData).subscribe((resp: any) => {
          if (resp.success) {
            console.log("OTP>>", resp.otp);
          }
        });
      }
    });
  }

  verifyOtp(frm: any) {
    const f = frm.form.value;
    if (!frm.value.invalid) {
      const data = {
        id: this.user.id,
        email: this.user.email,
        mobile: this.user.mobile,
        otp: f.otp,
      };
      console.log(data);
      this.auth.verifyOtp(data).subscribe((resp: any) => {
        if (resp.success) {
          this.otpVerified = true;
          this.verifyDetails = true;
          alert("OTP verified Successfully.");
          // this.router.navigate(["/dashboard"]);
          // console.log("PASSWORD LOGG",resp);
        }
      });
    }
  }
  passwordSubmit(frm: any) {
    const f = frm.form.value;
    const users = JSON.parse(localStorage.getItem("user" || "{}"));
    if (f.password == f.cnf_password) {
      const data = {
        id: this.user.id,
        password: f.password,
      };
      console.log(data);
      this.auth.resetPassword(data).subscribe((resp: any) => {
        if (resp.success) {
          alert("Password Changed Successfully.");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("refershToken");
          this.router.navigate(["/login"]);
          // console.log("PASSWORD LOGG",resp);
        }
      });
    } else {
      alert("Please fill same password!!!");
    }
  }
}
