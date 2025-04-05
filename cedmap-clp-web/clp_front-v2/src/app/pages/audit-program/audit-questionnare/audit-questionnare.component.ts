import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-audit-questionnare",
  templateUrl: "./audit-questionnare.component.html",
  styleUrls: ["./audit-questionnare.component.scss"],
})
export class AuditQuestionnareComponent implements OnInit {
  is_inactive: boolean = false;
  question_category: any;
  questions: any;
  selectedQuestion: any;
  query_id: any;
  userView: Boolean = true;
  queryData: void;
  constructor(
    private api: CoreApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param: any) => {
      this.query_id = param.id;
      if (this.query_id) {
        console.log(this.query_id);
        this.getQueryId();
        this.userView = false;
      } else {
        this.getQuestionCategory();
      }
    });
  }

  ngOnInit(): void {}

  getQueryId() {
    this.api
      .getById("auditQuestionQuery", this.query_id)
      .subscribe((resp: any) => {
        if (resp) {
          this.queryData = resp;
          console.log(">>>>>>>", this.queryData);
        }
      });
  }

  getQuestionCategory() {
    const query = {
      is_inactive: this.is_inactive,
      limit: 1000,
    };
    this.api.get("auditCategory", query).subscribe((resp: any) => {
      if (resp) {
        this.question_category = resp.data;
      }
    });
  }
  getQuestion(e: any) {
    console.log("e.target.value", e.target.value);
    const query = {
      question_category: e.target.value,
    };
    this.api.get("auditQuestion", query).subscribe((resp: any) => {
      if (resp) {
        this.questions = resp.data;
        console.log(">>>>>>>>>>", this.questions);
      }
    });
  }

  getSelectedQuestionValue(e: any) {
    const selectElement = e.target as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    this.selectedQuestion = selectedOption.textContent.trim();
    console.log("Selected Question:", this.selectedQuestion);
  }

  onSubmit(frm: NgForm) {
    if (frm.form.invalid) {
      alert("Please write your Question");
    } else {
      // otp verificaiotn remaning as per discussion
      this.api.post("auditQuestionQuery", frm.value).subscribe((resp: any) => {
        if (resp) {
          alert("Your Query has been submitted successfully");
          this.router.navigate(['/audit/audit-query-list'])
        }
      });
    }
  }
}
