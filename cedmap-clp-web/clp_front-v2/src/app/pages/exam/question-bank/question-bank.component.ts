import { Component, OnInit } from "@angular/core";
import { CoreApiService } from "src/app/services/core-api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-question-bank",
  templateUrl: "./question-bank.component.html",
  styleUrls: ["./question-bank.component.scss"],
})
export class QuestionBankComponent implements OnInit {
  questionList: any;
  listCount: any = 0;
  page = 1;
  limit = 30;
  is_inactive = false;
  newIndex: any;

  constructor(private api: CoreApiService, private router: Router) {
    this.getQuestionBank();
  }

  ngOnInit(): void {}

  getQuestionBank() {
    const queryData = {
      page: this.page,
      limit: this.limit,
      is_inactive: this.is_inactive,
    };
    this.api.get("question", queryData).subscribe((resp: any) => {
      this.questionList = resp.data;
      this.listCount = resp.meta.total;
      this.newIndex = resp.meta.from;
      console.log(resp);
    });
  }
  deleteQuestion(quesId: any) {
    if (confirm("Are you Sure !!!")) {
      this.api.delete("question", quesId).subscribe((resp: any) => {
        if (resp) {
          alert("Question Deleted successfully!!");
          this.getQuestionBank();
          console.log(resp);
        }

      });
    }
  }
}
