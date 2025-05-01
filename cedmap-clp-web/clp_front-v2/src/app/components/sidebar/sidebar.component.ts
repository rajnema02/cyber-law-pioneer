import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { CoreApiService } from "src/app/services/core-api.service";
import { environment } from "src/environments/environment";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  static?: boolean;
  children?: Array<any>;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
  // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
  // { path: '/one', title: 'one',  icon:'ni-circle-08 text-pink', class: '' },
  // { path: '/pyment', title: 'pyment',  icon:'ni-circle-08 text-pink', class: '' },

  // { path: '/stepper', title: 'stepper',  icon:'ni-circle-08 text-pink', class: '' }
];
export const AdminROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  {
    path: "/batch/batch-list",
    title: "Batch Details",
    icon: "ni ni-bullet-list-67 ",
    class: "",
  },
  {
    path: "/message/message-list",
    title: "Messages",
    icon: "ni ni-email-83 ",
    class: "",
  },

  {
    path: "/course/course-list",
    title: "Courses",
    icon: "ni ni-collection ",
    class: "",
    children: [
      {
        path: "/course/course-list",
        title: "Courses List",
      },
      {
        path: "/course/module-list",
        title: "Module",
      },
    ],
  },
  {
    path: "/master/",
    title: "Masters",
    icon: "ni ni-collection ",
    class: "",
    children: [
      {
        path: "/master/department-list",
        title: "Departments",
      },
      {
        path: "/about/program-list",
        title: "About Program",
        icon: "ni-single-02 ",
        class: "",
      },
      {
        path: "/knowledge-bank",
        title: "Knowledge Bank",
        icon: "ni-single-02 ",
        class: "",
      },
    ],
  },

  {
    path: "/audit/audit-program",
    title: "Internal Security Assessment",
    icon: "ni ni-collection ",
    class: "",
    children: [
      {
        path: "/audit/questoin-category",
        title: "Question Category",
      },
      // {
      //   path: "/audit/audit-question-add",
      //   title: "Audit Question Add",
      // },
      {
        path: "/audit/audit-question-list",
        title: "Question List",
      },
      {
        path: "/audit/exam-list",
        title: "Internal Assessment list",
      },
    ],
  },

  {
    path: "/user/user-list",
    title: "User Management",
    icon: "ni-single-02 ",
    class: "",
  },
  // {
  //   path: "center/center-list",
  //   title: "Center list",
  //   icon: "ni-single-02 ",
  //   class: "",
  // },
  {
    path: "/study/study-list",
    title: "Study Material Details",
    icon: "ni ni-books",
    class: "",
  },
  {
    path: "/exam/exam-list",
    title: "Exam",
    icon: "ni ni-paper-diploma",
    class: "",
    children: [
      {
        path: "/exam/exam-list",
        title: "Exam List",
      },
      {
        path: "/exam/schedule-exam",
        title: "Schedule Exam",
      },
      {
        path: "/exam/question-bank",
        title: "Question Bank",
        icon: "ni ni-ruler-pencil",
      },
      {
        path: "/exam/bulk-upload",
        title: "Bulk Upload",
        icon: "ni ni-ruler-pencil",
      },
    ],
  },
  // {
  //   path: "/viewpayment",
  //   title: "View Payment History",
  //   icon: "ni ni-payment",
  //   class: "",
  // },
  {
    path: "/content/team-detail-list",
    title: "Content Management",
    icon: "ni-tv-2  ",
    class: "",
    children: [
      {
        path: "/content/team-detail-list",
        title: "Team Detail List",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/service-offers",
        title: "Cyber security programs",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/service-offers-course",
        title: "Cyber security programs course",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/banner-list",
        title: "Banner",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/partner-list",
        title: "Our Partner",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/partner-service-list",
        title: "Partner Service",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/partner-service-desc-list",
        title: "Partner Service Description",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/practice-list",
        title: "Our Practice",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/service-list",
        title: "Our Service",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/service-project-list",
        title: "Service Project",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/service-project-desc-list",
        title: "Service Project Description",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/running-project-list",
        title: "Running Project",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/latest-update-list",
        title: "Latest Updates",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/partner-project-list",
        title: "Projects",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/latest-update-list",
        title: "Latest Updates",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/service-details-list",
        title: "Services Details",
        icon: "ni-tv-2  ",
      },
      {
        path: "/content/contact-list",
        title: "Contact Details",
        icon: "ni-tv-2  ",
      },
      
    ]
  },
];
export const AdminReadROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Applicant Lis",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
];
export const UserROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "ni-tv-2 text-primary",
    class: "",
  },

  {
    path: "/user-profile",
    title: "Registration",
    icon: "ni-single-02 text-yellow",
    class: "",
  },
  {
    path: "/about-program",
    title: "About Program",
    icon: "ni-book-bookmark text-green",
    class: "",
    // static: true
  },
  {
    path: "/audit/audit-questionnare",
    title: "Internal Assessment",
    icon: "ni ni-paper-diploma",
    class: "",
    children: [
      {
        path: "/audit/audit-query-list",
        title: "Assessment Questionnaire",
      },
      {
        path: "/audit/student-exam-list",
        title: "Assessment",
      },
      {
        path: "/audit/student-exam-list",
        title: "Report",
      },

    ],
  },
  {
    path: "/message/student-message-list",
    title: "Messages",
    icon: "ni ni-email-83 ",
    class: "",
  },
  {
    path: "/study/student-study-list",
    title: "video library",
    icon: "ni-tv-2 text-primary",
    class: "",
  },

  {
    path: "/exam/student-exam-list",
    title: "Exam",
    icon: "ni ni-paper-diploma",
    class: "",
    children: [
      {
        path: "/exam/student-exam-list",
        title: "Exam List",
      },
      {
        path: "/exam/demo-exam",
        title: "Demo Exam",
      },
      // {
      //   path: "/exam/examform",
      //   title: "Exam Form",
      // },
    ],
  },
  {
    path: "/dashboard",
    title: "My Profile",
    icon: "ni ni-paper-diploma",
    class: "",
    children: [
      {
        path: "/candidateProfile",
        title: "Form",
        icon: "ni ni-ruler-pencil",
      },
      // {
      //   path: "/candidateReceipt",
      //   title: "Payment Receipt",
      //   icon: "ni-settings-gear-65 text-red",
      //   class: "",
      // },
      {
        path: "exam/student-certificates",
        title: "Certificate",
        icon: "ni ni-ruler-pencil",
      },
      // {
      //   path: "student-id",
      //   title: "ID Card",
      //   icon: "ni ni-ruler-pencil",
      // },
    ],
  },
  // {
  //   path: "/viewpayment",
  //   title: "Payment History",
  //   icon: "ni ni-payment",
  //   class: "",
  // },
];
// export const DemoUserROUTES: RouteInfo[] = [
//   {
//     path: "/dashboard",
//     title: "Dashboard",
//     icon: "ni-tv-2 text-primary",
//     class: "",
//   },

//   // {
//   //   path: "/user-profile",
//   //   title: "Registration",
//   //   icon: "ni-single-02 text-yellow",
//   //   class: "",
//   // },
//   {
//     path: "/about-program",
//     title: "About Program",
//     icon: "ni-book-bookmark text-green",
//     class: "",
//     // static: true
//   },
//   {
//     path: "/study/student-study-list",
//     title: "video library",
//     icon: "ni-tv-2 text-primary",
//     class: "",
//   },
//   {
//     path: "/exam/student-exam-list",
//     title: "Exam",
//     icon: "ni ni-paper-diploma",
//     class: "",
//     // children: [
//     //   {
//     //     path: "/exam/schedule-exam",
//     //     title: "Schedule Exam"
//     //   },
//     //   {
//     //     path: "/exam/question-bank",
//     //     title: "Question Bank",
//     //     icon: "ni ni-ruler-pencil"

//     //   },

//     // ]
//   },
//   {
//     path: "/",
//     title: "My Profile",
//     icon: "ni ni-paper-diploma",
//     class: "",
//     children: [
//       {
//         path: "/profile",
//         title: "Form",
//       },
//       {
//         path: "",
//         title: "Certificate",
//         icon: "ni ni-ruler-pencil",
//       },
//       {
//         path: "",
//         title: "Result",
//         icon: "ni ni-ruler-pencil",
//       },
//     ],
//   },
//   {
//     path: "/viewpayment",
//     title: "View Payment",
//     icon: "ni ni-payment",
//     class: "",
//   },
//   // {
//   //   path: "/receipt/",
//   //   title: "Payment Receipt",
//   //   icon: "ni-settings-gear-65 text-red",
//   //   class: "",
//   // },
// ];
export const SuperAdminROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  {
    path: "/batch/batch-list",
    title: "Batch Details",
    icon: "ni ni-bullet-list-67 ",
    class: "",
  },
  {
    path: "/message/message-list",
    title: "Messages",
    icon: "ni ni-email-83 ",
    class: "",
  },
  {
    path: "/user/user-list",
    title: "User Management",
    icon: "ni-single-02 ",
    class: "",
  },
  {
    path: "/course/course-list",
    title: "Course Management",
    icon: "ni ni-collection ",
    class: "",
  },
  {
    path: "/study/study-list",
    title: "Study Material Details",
    icon: "ni ni-books",
    class: "",
  },

  {
    path: "/exam/exam-list",
    title: "Exam",
    icon: "ni ni-paper-diploma",
    class: "",
    children: [
      {
        path: "/exam/exam-list",
        title: "Exam List",
      },
      {
        path: "/exam/schedule-exam",
        title: "Schedule Exam",
      },
      {
        path: "/exam/question-bank",
        title: "Question Bank",
        icon: "ni ni-ruler-pencil",
      },
      {
        path: "/exam/bulk-upload",
        title: "Bulk Upload",
        icon: "ni ni-ruler-pencil",
      },
    ],
  },
  {
    path: "/viewpayment",
    title: "View Payment",
    icon: "ni ni-payment",
    class: "",
  },
];
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  user: any;
  userDetail: any;
  env: { production: boolean; url: string };
  userRole: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private api: CoreApiService
  ) {
    this.env = environment;
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.user = user;
      this.userRole = user.role;
    }
    if (this.user.id) {
      this.api.getById("user", this.user.id).subscribe((resp: any) => {
        // console.log("navbarResp>>", resp.profile_photo);

        this.userDetail = resp.profile_photo;
      });
    }
    const token = localStorage.getItem("token");
    if (!(this.user && token)) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    switch (user.role) {
      case "super-admin":
        this.menuItems = SuperAdminROUTES.filter((menuItem) => menuItem);
        break;
      case "admin":
        this.menuItems = AdminROUTES.filter((menuItem) => menuItem);
        break;
      case "admin-read":
        this.menuItems = AdminReadROUTES.filter((menuItem) => menuItem);
        break;
      case "user":
        this.menuItems = UserROUTES.filter((menuItem) => menuItem);
        break;
      // case "demo-user":
      //   this.menuItems = DemoUserROUTES.filter((menuItem) => menuItem);
      //   break;
      default:
        this.menuItems = ROUTES.filter((menuItem) => menuItem);
        break;
    }
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  logout() {
    this.authService.logout();
  }
}
