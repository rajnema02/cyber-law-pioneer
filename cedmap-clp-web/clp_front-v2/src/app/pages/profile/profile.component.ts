import { Component, OnInit } from "@angular/core";
import { FormBuilder, NgForm, Validators } from "@angular/forms";
import { BreakpointObserver } from "@angular/cdk/layout";
import { StepperOrientation } from "@angular/material/stepper";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CoreApiService } from "src/app/services/core-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FileService } from "src/app/services/file.service";

import { HttpEventType } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { log } from "console";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  pic_profile: boolean = false;
  pic_identity: boolean = false;
  pic_payment: boolean = false;
  pic_payment2: boolean = false;
  gender = ["male", "female"];
  department: any;
  category = ["genral", "obc", "sc", "st", "minority"];
  company = ["Public Ltd. Company"];
  courseUserData = {
    full_name: "",
    email: "",
    mobile: "",
    dob: "",
    father_name: "",
    mother_name: "",
    category: "",
    gender: "",
    home_address: "",
    city: "",
    country: "",
    postal_code: "",
    profile_photo: "",
    identity_file: "",
    amount: "",
    transaction_id: "",
    payment_receipt: "",
    amount_2: "",
    transaction_id_2: "",
    payment_receipt_2: "",
    course_code: "",
    course_type: "",
    module_name: "",
    mode: "",
    employeeType: "",
    company: "",
    companyType: "",
    office: "",
    block: "",
    district: "",
    pin_code: "",
    state: "",
    department: "",
    designation: "",
    whatsapp: "",
    payment_file: "",
    payment_file_2: "",
    identity: "",
    formStatus: "",
    transaction_at: new Date(),
    passing_year_10: "",
    marks_10: "",
    marksheet_10: "",
    passing_year_12: "",
    marks_12: "",
    marksheet_12: "",
    passing_year_graduation: "",
    marks_graduation: "",
    marksheet_graduation: "",
    paymentStatus: "pending",
  };
  user: any;
  user_id: any;
  imageFile: any;
  profile_pic: any;
  id_pic: any;
  payment_pic: any;
  payment_pic_2: any;
  env: any;
  userRole: any;
  course_name: any;
  courseFees: any;
  moduleFees: number;
  moduleData: any;
  module: boolean;
  moduleList: any;
  course_type: any;
  courseList: any;



  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private api: CoreApiService,
    private router: Router,
    private fs: FileService,
    private route: ActivatedRoute
  ) {
    this.env = environment;
    this.route.params.subscribe((param) => {
      if (param["id"]) {
        this.user_id = param["id"];
        const user = JSON.parse(localStorage.getItem("user"));
        this.userRole = user.role;
        this.getUser()
        // console.log("userRole", user.role);
      } else {
        const user = JSON.parse(localStorage.getItem("user"));

        this.user_id = user.id;
        this.getUser()
        // this.userRole= user.role;
        // console.log("userRole", user.role);
      }


    });
  }


  ngOnInit(): void {}
  getUser() {
    this.api.getById("user", this.user_id).subscribe((resp: any) => {
      console.log(resp);
      // if (resp.formStatus) {
      //   alert("You already submitted this form!");
      //   this.router.navigate(["/dashboard"]);
      // }

      this.courseUserData.full_name = resp.full_name;
      this.courseUserData.email = resp.email;
      this.courseUserData.mobile = resp.mobile;
      this.courseUserData.dob = resp.dob;
      this.courseUserData.father_name = resp.father_name;
      this.courseUserData.mother_name = resp.mother_name;
      this.courseUserData.category = resp.category;
      this.courseUserData.gender = resp.gender;
      this.courseUserData.home_address = resp.home_address;
      this.courseUserData.city = resp.city;
      this.courseUserData.country = resp.country;
      this.courseUserData.postal_code = resp.postal_code;
      this.courseUserData.profile_photo = resp.profile_photo;
      this.courseUserData.identity_file = resp.identity_file;
      this.courseUserData.payment_file = resp.payment_file;
      this.courseUserData.payment_file_2 = resp.payment_file_2;
      this.courseUserData.transaction_id = resp.transaction_id;
      this.courseUserData.transaction_id_2 = resp.transaction_id_2;
      this.courseUserData.transaction_at = resp.transaction_at;
      // this.courseUserData.payment_receipt = resp.payment_receipt;
      this.courseUserData.course_code = resp.course_code;
      this.courseUserData.course_type = resp.course_type;
      this.courseUserData.module_name = resp.module_name;
      this.courseUserData.mode = resp.mode;
      this.courseUserData.employeeType = resp.employeeType;
      this.courseUserData.company = resp.company;
      this.courseUserData.companyType = resp.companyType;
      this.courseUserData.office = resp.office;
      this.courseUserData.block = resp.block;
      this.courseUserData.district = resp.district;
      this.courseUserData.pin_code = resp.pin_code;
      this.courseUserData.state = resp.state;
      this.courseUserData.department = resp.department;
      this.courseUserData.designation = resp.designation;
      this.courseUserData.whatsapp = resp.whatsapp;
      this.courseUserData.amount = resp.amount;
      this.courseUserData.identity = resp.identity;
      this.courseUserData.formStatus = resp.formStatus;
      this.courseUserData.amount_2 = resp.amount_2;
      // this.is_profileRejected = resp.is_profileRejected;
      console.log(
        "this.courseUserData.course_code",
        this.courseUserData.course_code
      );
      // if (resp.is_profileRejected) {
      //   this.getCourseList(resp.course_type)
      // }
    });
  }

  printComponent(cmpName) {
    // let printContents = document.getElementById(cmpName).innerHTML;

    // Open a new window

    // Get the HTML content of the element
    let printContents = document.getElementById(cmpName).innerHTML;
    // Save the original contents of the head and body
    let originalHead = document.head.innerHTML;
    let originalBody = document.body.innerHTML;
    // Set the content of the new window
    let printWindow = window.open("", "_blank");
    // Set the content of the head and body in the new window
    printWindow.document.head.innerHTML = document.head.innerHTML;
    printWindow.document.body.innerHTML = printContents;
    printWindow.document.body.innerHTML = printContents;

    printWindow.print();

  }
}
