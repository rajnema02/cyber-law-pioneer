import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-update-password",
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.scss"],
})
export class UpdatePasswordComponent implements OnInit {
  userId: any;
  user: any;
  name: any;
  userEmail: any;

  constructor(
    private api: CoreApiService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
  ) {
    this.route.params.subscribe((param: any) => {
      this.userId = param.id;
      if (this.userId) {
        this.getUser();
      }
    });
  }

  ngOnInit(): void {}
  getUser() {
    this.api.getById('user',this.userId).subscribe((resp:any)=>{
      if (resp){
        this.name = resp.full_name
        this.userEmail = resp.email
        // console.log(this.name, this.userEmail);
      }

    })
  }
  loginSubmit(frm: any) {

    const f = frm.form.value
    if (f.password == f.cnf_password) {
      const data ={
        id: this.userId,
        password: f.password
      }
      console.log(f);
      this.auth.resetPassword(data).subscribe((resp:any)=>{
        if (resp.success) {
          alert("Password Changed Successfully.")
          this.router.navigate(['/dashboard'])
          // console.log("PASSWORD LOGG",resp);
        }

      })
    } else{
      alert("Please fill same password!!!")
    }

  }
}
