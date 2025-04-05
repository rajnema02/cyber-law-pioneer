import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  id: any;
  full_name: any;
  email: any;
  password: any;
  mobile: any;
  role_desc: any;
  registered_at: any;
  user: any;

  constructor(private api: CoreApiService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.route.params.subscribe((param: any)=>{
      this.id = param.id;
    })
    this.getUser();

  }

  getUser(){
    this.api.getById("user", this.id).subscribe((resp: any)=>{
      this.user= resp;
      console.log(this.user);
    })
  }
  submit(frm: NgForm){
    if(frm.form.invalid){
      alert("Please fill all the necessary details");


    }else{
      const formData ={
        full_name: frm.form.value.full_name,
        email: frm.form.value.email,
        password: frm.form.value.password,
        mobile: frm.form.value.mobile,
        role_desc: frm.form.value.role_desc,
        role: "admin"

      }

      // console.log(formData);
      this.api.put("user",this.id, formData).subscribe((resp: any) => {
        if (resp) {


         console.log(resp);
         this.router.navigate(['/user/user-list']);


        }

      });
    }

  }

}
