import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  userRole: any;
  loginUserData = {
    email: "",
    password: "",
  };
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}
  loginSubmit(frm: NgForm) {
    // console.log(frm.form.value);
    // return;

    this.auth.authlogin(frm.form.value).subscribe((resp: any) => {
      if (resp) {
        // console.log(resp);
        localStorage.setItem("token", resp.token);
        localStorage.setItem("user", JSON.stringify(resp));
        this.userRole= localStorage.getItem("role");
        if(this.userRole== 'admin-read'){
        this.router.navigate(["/dashboard-read"]);

        }
        this.router.navigate(["/dashboard"]);
      }
    });
  }
  ngOnDestroy() {}
}

