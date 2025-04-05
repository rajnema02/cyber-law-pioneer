import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-audit-questionnare-list",
  templateUrl: "./audit-questionnare-list.component.html",
  styleUrls: ["./audit-questionnare-list.component.scss"],
})
export class AuditQuestionnareListComponent implements OnInit {
  questionList: any;
  listCount: any = 0;
  newIndex: any;
  page = 1;
  limit = 30;
  is_inactive = false;
  user_id: any;
  created_by: any;
  user: any;

  constructor(private api: CoreApiService, private router: Router,
    private route: ActivatedRoute) {
    // this.env = environment;
    this.user = JSON.parse(localStorage.getItem("user" || "{}"));
    this.route.params.subscribe((param: any) => {
      this.user_id = param.id;
      if (this.user_id) {
        this.created_by = this.user_id
        this.getList();
      } else {
        this.created_by = this.user.id
        this.getList();
      }
    });
  }

  ngOnInit(): void { }
  getList() {
    const query = {
      created_by:this.created_by,
      page: this.page,
      limit: this.limit,
      is_inactive: this.is_inactive,
    };
    this.api.get("auditQuestionQuery", query).subscribe((resp: any) => {
      if (resp) {
        this.questionList = resp.data;
        this.listCount = resp.meta.total;
        this.newIndex = resp.meta.from;
        console.log(resp);
      }
    });
  }
}
