import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { CoreApiService } from "src/app/services/core-api.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  providers: [DatePipe]
})
export class RegisterComponent implements OnInit {
  showForm: Boolean = true;
  email: string = '';
  password: string = '';
  userId: string = '';
  ageStatus: string = '';
  age: number | null = null;
  minDate: string;
  maxDate: string;
  ageError: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private api: CoreApiService,
    private datePipe: DatePipe
  ) {
    const today = new Date();
    this.maxDate = this.datePipe.transform(today, 'yyyy-MM-dd'); // allow up to today
    this.minDate = this.datePipe.transform(new Date(today.getFullYear() - 100, today.getMonth(), today.getDate()), 'yyyy-MM-dd');
  }

  ngOnInit() {}

  regSubmit(frm: NgForm) {
    if (frm.form.invalid) {
      alert("Please fill all the necessary details");
      return;
    }
  
    // Ensure age is calculated if not already done
    if (frm.form.value.dob && !this.age) {
      this.checkAge(frm.form.value.dob);
    }
  
    const formData = {
      ...frm.form.value,
      dob: this.datePipe.transform(frm.form.value.dob, 'yyyy-MM-dd'),
      age: this.age,
      ageStatus: this.ageStatus
    };
  
    this.api.post("user", formData).subscribe(
      (resp: any) => {
        if (resp) {
          this.userId = resp._id;
          this.email = frm.form.value.email;
          this.password = frm.form.value.password;
          alert("OTP has been sent to your mobile number. Please verify.");
          this.showForm = false;
        }
      },
      (error) => {
        alert(error?.error?.error?.message || error?.message || "Registration failed");
      }
    );
  }

  Submit(frm: NgForm) {
    if (frm.form.invalid) {
      alert("Please enter the OTP");
      return;
    }

    const data = {
      ...frm.form.value,
      userId: this.userId,
      password: this.password
    };

    this.api.post("user/verify", data).subscribe(
      (resp: any) => {
        if (resp.success) {
          alert("Registration successful!");
          this.loginAfterRegistration();
        } else {
          alert("Wrong OTP entered");
        }
      },
      (error) => {
        alert(error?.error?.error?.message || error?.message || "Verification failed");
      }
    );
  }

  private loginAfterRegistration() {
    const loginUserData = {
      authid: this.email,
      password: this.password
    };

    this.auth.login(loginUserData).subscribe(
      (resp: any) => {
        if (resp) {
          localStorage.setItem("token", resp.token);
          localStorage.setItem("user", JSON.stringify(resp));
          this.router.navigate(["/dashboard"]);
        }
      },
      (error) => {
        this.router.navigate(["/login"]);
      }
    );
  }

  checkAge(dob: string) {
    if (!dob) {
        this.age = null;
        this.ageStatus = null;
        return;
    }

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    this.age = age;
    this.ageStatus = age >= 18 ? '18_or_above' : 'below_18';
}
}
