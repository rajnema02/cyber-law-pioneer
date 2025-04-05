import { Component, OnInit } from "@angular/core";
import { CoreApiService } from "src/app/services/core-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.scss"],
})
export class CreateUserComponent implements OnInit {
  full_name: any;
  email: any;
  password: any;
  mobile: any;
  role: any;
  role_desc: any;
  registered_at: any;

  constructor(private api: CoreApiService, private router: Router) {}

  ngOnInit(): void {}

  submit(frm: NgForm) {
    const f = frm.form;
    if (f.invalid) {
      alert("Please fill all the necessary details");
    } else {
      const formData = {
        full_name: f.value.full_name,
        email: f.value.email,
        password: f.value.password,
        mobile: f.value.mobile,
        role_desc: f.value.role_desc,
        role: f.value.role,
      };
      // console.log(formData);
      this.api.post("user", formData).subscribe((resp: any) => {
        if (resp) {
          console.log(resp);
          alert("user added successfully");
          this.router.navigate(["/user/user-list"]);
        }
      });
    }
  }
}
