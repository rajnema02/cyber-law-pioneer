import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-batch-allotment",
  templateUrl: "./batch-allotment.component.html",
  styleUrls: ["./batch-allotment.component.scss"],
})
export class BatchAllotmentComponent implements OnInit {
  user: any;
  formStatus: any;
  role: any;
  userList: any;
  page = 1;
  limit = 10000;
  is_inactive = false;
  env: { production: boolean; url: string };
  profile_verify: any;
  formQueries = [
    { formStatus: false },
    { formStatus: true, is_profileVerified: false },
    { formStatus: true, is_profileVerified: true },
  ];
  selectedFormQuery: any;
  full_name: any;
  mobile: any;
  email: any;
  transaction_id: any;
  created_at: Date;
  listCount: any = 0;
  id: any;
  BatchCount: any;
  BatchList: any;
  selectedStudent: any[] = [];
  studentId: [];

  constructor(
    private api: CoreApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      if (this.id) {
        this.getBatchId();
      }
    });

    this.env = environment;

    this.getUserList();
  }
  ngOnInit(): void {}

  getBatchId() {
    this.api.getById("batch", this.id).subscribe((resp: any) => {
      this.BatchList = resp;
    });
  }

  getUserList() {
    const queryData = {
      page: this.page,
      limit: this.limit,
      is_inactive: this.is_inactive,
      role: "user",
      is_profileVerified: true,

      // batch: null
    };

    this.api
      .get("user/batchAllotmentList", queryData)
      .subscribe((resp: any) => {
        this.userList = resp.data;
        this.listCount = resp.meta.total;
        this.selectedStudent = this.userList
          .filter((o) => o.batch == this.id)
          .map((o) => o._id);
      });
  }

  selectStud(stdId: any) {
    if (!this.selectedStudent.filter((o) => o == stdId).length) {
      this.selectedStudent.push(stdId);
    } else {
      this.selectedStudent = this.selectedStudent.filter((o) => o != stdId);
    }
  }

  isSelected(stdId: any) {
    return this.selectedStudent.filter((o) => o == stdId).length;
  }

  allotToBatch() {
    console.log("this.selectedStudentrs", this.selectedStudent);
    const data = {
      batch: this.selectedStudent,
    };
    if (confirm("Are you Sure !!!")) {
      this.api
        .allotBatch("user/batch", this.id, data)
        .subscribe((resp: any) => {
          if (resp) {
            console.log(resp);
            alert("Students are alloated in batch Successsfully");
            this.getUserList();
          }
        });
    } else {
      return;
    }
  }
}
