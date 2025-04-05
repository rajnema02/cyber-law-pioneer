import { Component, OnInit } from "@angular/core";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-audit-question-list",
  templateUrl: "./audit-question-list.component.html",
  styleUrls: ["./audit-question-list.component.scss"],
})
export class AuditQuestionListComponent implements OnInit {
  questionList: any;
  listCount: any = 0;
  newIndex: any;
  page = 1;
  limit = 30;
  is_inactive = false;

  constructor(private api: CoreApiService) {
    this.getList();
  }

  ngOnInit(): void {}

  getList() {
    const query = {
      page: this.page,
      limit: this.limit,
      is_inactive: this.is_inactive,
    };
    this.api.get("auditQuestion", query).subscribe((resp: any) => {
      if (resp) {
        this.questionList = resp.data;
        this.listCount = resp.meta.total;
        this.newIndex = resp.meta.from;
        console.log(resp);
      }
    });
  }
}
