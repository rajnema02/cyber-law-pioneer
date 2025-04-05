import { Component, OnInit } from "@angular/core";
import { FormBuilder, NgForm, Validators } from "@angular/forms";
import { BreakpointObserver } from "@angular/cdk/layout";
import { StepperOrientation } from "@angular/material/stepper";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CoreApiService } from "src/app/services/core-api.service";
import { Router } from "@angular/router";
import { FileService } from "src/app/services/file.service";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

import { HttpEventType } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  gender = ["male", "female"];
  // department = ["School Education Department MP", " Public Work Department MP"];
  department: any;
  category = ["genral", "obc", "sc", "st", "minority"];
  company: any;
  districts = [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Mandla",
    "Mandsaur",
    "Mauganj",
    "Morena",
    "Narmadapuram",
    "Narsinghpur",
    "Neemuch",
    "Niwari",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha",
  ];
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
  tenth_pic: any;
  twelth_pic: any;
  graduation_pic: any;
  payment_pic: any;
  payment_pic_2: any;
  disclaimer: boolean = false;
  viewFormStatus: boolean = true;
  env: any;
  checked: boolean;
  is_profileRejected: any;
  course_type: any;
  courseList: any;
  course_name: any;
  courseFees: any;
  specialProgram: boolean = false;
  otherProgram: boolean = false;
  regForm: boolean = false;
  formTitle: string = "";
  paymentTable: boolean = false;
  feePaid: any;
  specialFeePaid: boolean;
  moduleList: any;
  module: boolean = false;
  moduleData: any;
  module_name: any;
  moduleFees: any = 0;

  method(first: any, stepper: any) {
    (first.completed = true), stepper.next();
  }

  method2(second: any, stepper: any) {
    (second.completed = true), stepper.next();
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ["", Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ["", Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ["", Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  closeResult = "";
  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private api: CoreApiService,
    private router: Router,
    private fs: FileService,
    private modalService: NgbModal
  ) {
    this.env = environment;
    this.user = JSON.parse(localStorage.getItem("user" || "{}"));
    // this.user_id = this.user.id
    // console.log("user===>>",this.user);

    this.stepperOrientation = breakpointObserver
      .observe("(min-width: 800px)")
      .pipe(map(({ matches }) => (matches ? "horizontal" : "vertical")));

    this.getUser();
    this.getDepartment();
    // this.getCourseForm()
  }
  open(content) {
    const modalOptions: NgbModalOptions = {
      backdropClass: "custom-backdrop",
      centered: true,
    };
    this.modalService.open(content, modalOptions);
  }

  viewForm() {
    this.viewFormStatus = false;
  }
  backToForm() {
    this.viewFormStatus = true;
  }
  getDepartment() {
    this.api.get("department", {}).subscribe((resp: any) => {
      this.department = resp.data;
      console.log("RRRREEEEESPP>>", resp);
    });
  }
  getCourseForm(evt: any) {
    const f = evt.target.value;
    switch (f) {
      case "Special":
        this.formTitle = "Cyber Security Training Program";
        console.log("CourseForm", f);
        this.regForm = true;
        this.specialProgram = true;
        this.otherProgram = false;
        this.paymentTable = false;
        this.specialFeePaid = true;
        break;
      case "Other":
        console.log("CourseForm", f);
        this.formTitle = " Certification / Diploma/ E-Learning Programs";
        this.regForm = true;
        this.specialProgram = false;
        this.otherProgram = true;
        this.paymentTable = true;
        this.specialFeePaid = false;
        break;
      default:
    }
  }

  getCourseList(evt: any) {
    if (evt.target.value) {
      this.course_type = evt.target.value;
    } else {
      this.course_type = evt;
    }
    console.log("this.course_type", this.course_type);

    this.api
      .get("course", { course_type: this.course_type })
      .subscribe((resp: any) => {
        this.courseList = resp.data;
        console.log("courseList", resp.data);
      });
  }
  getBatch(evt: any) {
    this.course_name = evt.target.value.split("-");
    console.log("this.course_name", this.course_name);
    this.api
      .get("course", { course_name: this.course_name[0] })
      .subscribe((resp: any) => {
        console.log("courseList22", resp.data);
        this.courseFees = resp.data[0].fees;
        this.moduleFees = 0;
        console.log("FEES", this.courseFees);
      });

    this.api
      .get("coursemodule", { course_name: this.course_name[0] })
      .subscribe((resp: any) => {
        if (resp.data && resp.data.length) {
          this.moduleData = resp.data;
          this.moduleData.forEach((element) => {
            if (element.course_name == this.course_name[0]) {
              console.log("resp.data", resp.data);

              this.module = true;
              this.moduleList = resp.data;
            } else {
              this.module = false;
            }
          });
        }
      });
  }
  getModuleData(evt: any) {
    this.module_name = evt.target.value;
    console.log("MODULE NAME>>>>", this.module_name);

    this.api
      .getById("coursemodule", this.module_name)
      .subscribe((resp: any) => {
        console.log("courseLmoduleist22", resp);
        this.moduleFees = resp.module_fee;
        console.log("FEES", this.moduleFees);
      });
  }

  getUser() {
    this.api.getById("user",this.user.id).subscribe((resp: any) => {
      console.log(resp);
      if (resp.formStatus) {
        alert("You already submitted this form!");
        this.router.navigate(["/dashboard"]);
      }

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
      this.is_profileRejected = resp.is_profileRejected;
      console.log(
        "this.courseUserData.course_code",
        this.courseUserData.course_code
      );
      // if (resp.is_profileRejected) {
      //   this.getCourseList(resp.course_type)
      // }
    });
  }

  ngOnInit(): void {}

  dis() {
    if (this.disclaimer) {
      this.disclaimer = false;
      this.checked = true;
    } else {
      this.disclaimer = true;
      this.checked = false;
    }
  }
  uploadprofile(e: any) {
    // if (e.target.files.length) {
    //   this.imageFile = e.target.files[0];
    //   this.profile();
    // } else {
    //   this.imageFile = null;
    // }

    if (e.target.files.length) {
      const selectedFile = e.target.files[0];

      // Check if the selected file is an image
      if (this.isImageFile(selectedFile)) {
        this.imageFile = selectedFile;
        this.profile();
      } else {
        alert("Selected file is not an image.Please select image file");
        this.imageFile = null;
      }
    } else {
      this.imageFile = null;
    }
  }

  isImageFile(file: File): boolean {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

    return allowedImageTypes.includes(file.type);
  }
  profile() {
    if (this.imageFile) {
      this.fs.uploadFile(this.imageFile).subscribe((res: any) => {
        if (res.type == HttpEventType.Response) {
          const body: any = res.body;
          this.profile_pic = body.file.path;
          this.courseUserData.profile_photo = this.profile_pic;
          // this.as.successToast(res.msg)
        }
      });
    } else {
      alert("Select Image");
    }
  }
  uploadidentity(e: any) {
    if (e.target.files.length) {
      const selectedFile = e.target.files[0];

      // Check if the selected file is an image
      if (this.isImageFile(selectedFile)) {
        this.imageFile = selectedFile;
        this.identity();
      } else {
        alert("Selected file is not an image.Please select image file");
        this.imageFile = null;
      }
    } else {
      this.imageFile = null;
    }
  }
  identity() {
    if (this.imageFile) {
      this.fs.uploadFile(this.imageFile).subscribe((res: any) => {
        if (res.type == HttpEventType.Response) {
          const body: any = res.body;
          this.id_pic = body.file.path;
          this.courseUserData.identity_file = this.id_pic;
          // console.log(this.images);
          // this.as.successToast(res.msg)
        }
      });
    } else {
      alert("Select Image");
    }
  }

  uploadGraduation(e: any) {
    if (e.target.files.length) {
      // this.imageFile = e.target.files[0];
      const selectedFile = e.target.files[0];

      // Check if the selected file is an image
      if (this.isImageFile(selectedFile)) {
        this.imageFile = selectedFile;
        this.graduation();
      } else {
        alert("Selected file is not an image.Please select image file");
        this.imageFile = null;
      }
    } else {
      this.imageFile = null;
    }
  }
  graduation() {
    if (this.imageFile) {
      this.fs.uploadFile(this.imageFile).subscribe((res: any) => {
        if (res.type == HttpEventType.Response) {
          const body: any = res.body;
          this.graduation_pic = body.file.path;
          this.courseUserData.marksheet_graduation = this.graduation_pic;
          // console.log(this.images);
          // this.as.successToast(res.msg)
        }
      });
    } else {
      alert("Select Image");
    }
  }
  uploadTwelth(e: any) {
    if (e.target.files.length) {
      // this.imageFile = e.target.files[0];
      const selectedFile = e.target.files[0];

      // Check if the selected file is an image
      if (this.isImageFile(selectedFile)) {
        this.imageFile = selectedFile;
        this.twelth();
      } else {
        alert("Selected file is not an image.Please select image file");
        this.imageFile = null;
      }
    } else {
      this.imageFile = null;
    }
  }
  twelth() {
    if (this.imageFile) {
      this.fs.uploadFile(this.imageFile).subscribe((res: any) => {
        if (res.type == HttpEventType.Response) {
          const body: any = res.body;
          this.twelth_pic = body.file.path;
          this.courseUserData.marksheet_12 = this.twelth_pic;
          // console.log(this.images);
          // this.as.successToast(res.msg)
        }
      });
    } else {
      alert("Select Image");
    }
  }

  uploadTenth(e: any) {
    if (e.target.files.length) {
      const selectedFile = e.target.files[0];

      // Check if the selected file is an image
      if (this.isImageFile(selectedFile)) {
        this.imageFile = selectedFile;
        this.tenth();
      } else {
        alert("Selected file is not an image.Please select image file");
        this.imageFile = null;
      }
    } else {
      this.imageFile = null;
    }
  }
  tenth() {
    if (this.imageFile) {
      this.fs.uploadFile(this.imageFile).subscribe((res: any) => {
        if (res.type == HttpEventType.Response) {
          const body: any = res.body;
          this.tenth_pic = body.file.path;
          this.courseUserData.marksheet_10 = this.tenth_pic;
          // console.log(this.images);
          // this.as.successToast(res.msg)
        }
      });
    } else {
      alert("Select Image");
    }
  }

  uploadpayment(e: any) {
    if (e.target.files.length) {
      const selectedFile = e.target.files[0];

      // Check if the selected file is an image
      if (this.isImageFile(selectedFile)) {
        this.imageFile = selectedFile;
        this.payment();
      } else {
        alert("Selected file is not an image.Please select image file");
        this.imageFile = null;
      }
    } else {
      this.imageFile = null;
    }
  }
  payment() {
    if (this.imageFile) {
      this.fs.uploadFile(this.imageFile).subscribe((res: any) => {
        if (res.type == HttpEventType.Response) {
          const body: any = res.body;
          this.payment_pic = body.file.path;
          this.courseUserData.payment_file = this.payment_pic;

          // console.log(this.images);
          // this.as.successToast(res.msg)
        }
      });
    } else {
      alert("Select Image");
    }
  }

  uploadpayment_2(e: any) {
    if (e.target.files.length) {
      const selectedFile = e.target.files[0];

      // Check if the selected file is an image
      if (this.isImageFile(selectedFile)) {
        this.imageFile = selectedFile;
        this.payment_2();
      } else {
        alert("Selected file is not an image.Please select image file");
        this.imageFile = null;
      }
    } else {
      this.imageFile = null;
    }
  }
  payment_2() {
    if (this.imageFile) {
      this.fs.uploadFile(this.imageFile).subscribe((res: any) => {
        if (res.type == HttpEventType.Response) {
          const body: any = res.body;
          this.payment_pic_2 = body.file.path;
          this.courseUserData.payment_file_2 = this.payment_pic_2;
          // console.log(this.images);
          // this.as.successToast(res.msg)
        }
      });
    } else {
      alert("Select Image");
    }
  }
  submit(frm: NgForm) {
    if (frm.form.invalid) {
      alert("Please fill all the necessary details");
    } else {
      // console.log("this.is_profileRejected>>>>>",this.is_profileRejected);
      this.courseUserData.profile_photo = this.profile_pic;
      this.courseUserData.identity_file = this.id_pic;
      this.courseUserData.payment_file = this.payment_pic;
      this.courseUserData.payment_file_2 = this.payment_pic_2;
      this.courseUserData.marksheet_graduation = this.graduation_pic;
      this.courseUserData.marksheet_12 = this.twelth_pic;
      this.courseUserData.marksheet_10 = this.tenth_pic;
      this.courseUserData.formStatus = "true";
      // this.courseUserData.company = "MPCON Ltd";
      this.courseUserData.paymentStatus = "pending";
      // if (this.is_profileRejected == false) {
      //   this.courseUserData.transaction_at= new Date();
      // }
      console.log(">>>>==UserData==>>>>>", this.courseUserData);
      // if (this.courseUserData.employeeType != "Government Officers") {
      //   //############## FOR ONLINE PAYMENT START########################
      //   this.api
      //     .post(
      //       "makePayment/preTrnReq/" +
      //         `${this.user.id}` +
      //         "/" +
      //         `${this.courseUserData.course_type}` +
      //         "/" +
      //         `${this.courseUserData.course_code}`,
      //       this.courseUserData
      //     )
      //     .subscribe({
      //       next: (resp: any) => {
      //         if (resp.success) {
      //           window.location.href =
      //             "https://mpced.mpconsultancy.org/makePayment/meTrnReq/" +
      //             `${this.user.id}` +
      //             "/" +
      //             `${this.courseUserData.course_type}` +
      //             "/" +
      //             `${this.courseUserData.course_code}` +
      //             "/" +
      //             resp.orderId;
      //         }
      //       },
      //       error: (err: any) => {
      //         alert("Some Error Occured Please Try Again !");
      //       },
      //     });
      //     //############## FOR ONLINE PAYMENT END########################
      // } else {
      console.log("THIS FUNCTION CALLED!!!!!!!!!!!");
      //############## FOR OFFLINE PAYMENT START ##############################
      this.api
        .put("user", this.user.id, this.courseUserData)
        .subscribe((resp: any) => {
          if (resp) {
            console.log(resp);
            alert("Your form Submitted Successfully");
            this.router.navigate(["/dashboard"]);
          }
        });
      // }
    }
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
    // Define a callback function to be called after printing
    // function afterPrint() {
    //   // Perform actions after the user has interacted with the print dialog
    //   console.log("Print dialog closed");
    //   // You can add your logic here
    //   // ...

    //   // Restore the original contents of the head and body
    //   printWindow.document.head.innerHTML = originalHead;
    //   printWindow.document.body.innerHTML = originalBody;
    //   // Close the window after printing and handling user response
    //   printWindow.close();
    //   this.backToForm();
    // }

    // // Attach an event listener for the 'afterprint' event
    // if ("onafterprint" in window) {
    //   window.onafterprint = afterPrint;
    // } else {
    //   // For some browsers that do not support 'onafterprint' event
    //   const mediaQueryList = (window as any).matchMedia("print");
    //   mediaQueryList.addListener(function (mql) {
    //     if (!mql.matches) {
    //       // 'afterprint' event simulation
    //       afterPrint();
    //     }
    //   });
    // }
  }

  printPage(printWindow) {
    setTimeout(() => {
      // Close the new window after printing
      printWindow.close();
      this.backToForm();
    }, 5000);
    window.print();
  }
}
