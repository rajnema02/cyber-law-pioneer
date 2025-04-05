import { Component, OnInit } from "@angular/core";
import { AdminLayoutRoutes } from "../../layouts/admin-layout/admin-layout.routing";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-landing-contact",
  templateUrl: "./landing-contact.component.html",
  styleUrls: ["./landing-contact.component.scss", "./base.css"],
})
export class LandingContactComponent implements OnInit {
  showForm: Boolean = true;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  mobile: string = '';
  message: string = '';
  userId: any;
  otp: number;
  showOtpModal: boolean = false;
  enteredOtp: number = 0;
  constructor(private auth: AuthService,
      private router: Router,
      private api: CoreApiService) {}

  ngOnInit(): void {}
  regSubmit(frm: NgForm) {
    const f = frm.form;
    if (f.invalid) {
      alert("Please fill all the necessary details");
    } else {
      const formData = {
        firstName: f.value.firstName,
        lastName: f.value.lastName,
        email: f.value.email,
        mobile: f.value.mobile,
        message: f.value.message,
      };
  
      this.api.post("contact", formData).subscribe((resp: any) => {
        if (resp) {
          console.log(resp);
          this.userId = resp._id;
          alert("Created successfully. Please check your OTP.");
          // this.otp = resp.otp; 
          // this.showOtpModal = true; 
          this.showForm = false;
        }
      });
    }
  }
  Submit(frm: NgForm) {
    console.log("frm",frm)
    if (frm.form.invalid) {
      alert("Please fill all the necessary details");
    } else {
    const data = {
      ...frm.form.value,
      firstName: this.firstName,
      lastName: this.lastName, 
      email: this.email,  
      message: this.message,  
      mobile: this.mobile,  
      otp: this.otp,
      _id: this.userId,
    };
    console.log("data",data)
    this.api.post("contact/verify", data).subscribe((resp: any) => { 
      console.log("respresp",resp); 
      console.log("Response from OTP verification", resp);
      if (resp.success) {
        alert("Registered successfully!");
        this.router.navigate(["/home"]);
      } else {
        alert("OTP verification failed. Please try again.");
      }
});
  }
}
}
