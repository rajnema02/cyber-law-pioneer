import { Component, OnInit } from "@angular/core";
import { AdminLayoutRoutes } from "../../layouts/admin-layout/admin-layout.routing";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  // loginUserData = {
  //   email: "",
  //   password: "",
  // };
  // clickdis: any = true;
  showForm: Boolean = true;
  email: any;
  password: any;
  userId: any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private api: CoreApiService
  ) {}

  ngOnInit() {}
  ngOnDestroy() {}
  // dis() {
  //   this.clickdis = false;
  // }

  regSubmit(frm: NgForm) {
    if (frm.form.invalid) {
      alert("Please fill all the necessary details");
    } else {
      // this.dis();
      this.api.post("user", frm.form.value).subscribe((resp: any) => {
        if (resp) {
          this.userId = resp._id;
          alert("Otp have been send on mobile Number please verify.");
          this.showForm = false;
          // // this.router.navigate(["/login"]);
          // let loginUserData = {
          //   authid: frm.form.value.email,
          //   password: frm.form.value.password,
          // };
          // // this.clickdis = true;
          // this.auth.login(loginUserData).subscribe((resp: any) => {
          //   if (resp) {
          //     localStorage.setItem("token", resp.token);
          //     localStorage.setItem("user", JSON.stringify(resp));
          //     this.router.navigate(["/dashboard"]);
          //   }
          // });
        } else {
          // this.clickdis = false;
        }
        // },
        // error: (err: any) => {
        //   alert(err?.error?.error?.message || err?.message);
        // }
      });
    }
  }
  Submit(frm: NgForm) {
    // console.log(this.userId);
    // return;

    if (frm.form.invalid) {
      alert("Please fill all the necessary details");
    } else {
      // this.dis();
      const data = {
        ...frm.form.value,
        userId: this.userId,
        password: this.password,
      };
      this.api.post("user/verify", data).subscribe((resp: any) => {
        // console.log(resp);
        // return;

        if (resp.success == true) {
          // this.router.navigate(["/login"]);
          alert("User Registered !!!!");
          let loginUserData = {
            authid: this.email,
            password: this.password,
          };
          // this.clickdis = true;
          this.auth.login(loginUserData).subscribe((resp: any) => {
            if (resp) {
              localStorage.setItem("token", resp.token);
              localStorage.setItem("user", JSON.stringify(resp));
              this.router.navigate(["/dashboard"]);
            }
          });
        } else {
          // this.clickdis = false;
          alert("Wrong OTP Entered");
        }
        // },
        // error: (err: any) => {
        //   alert(err?.error?.error?.message || err?.message);
        // }
      });
    }
  }

  registerUserData = {
    first_name: "",
    last_name: "",
    dob: "",
    mobile: "",
    email: "",
    password: "",
  };
}
