import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-question-category-list",
  templateUrl: "./question-category-list.component.html",
  styleUrls: ["./question-category-list.component.scss"],
})
export class QuestionCategoryListComponent implements OnInit {
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
    this.api.get("auditCategory", query).subscribe((resp: any) => {
      if (resp) {
        this.questionList = resp.data;
        this.listCount = resp.meta.total;
        this.newIndex = resp.meta.from;
        console.log(resp);
      }
    });
  }

  onSubmit(frm: NgForm) {
    if (frm.form.invalid) {
      alert("Please fill all the necessary details");
    } else {
      // console.log("Form Submitted:", frm.value);
      this.api.post("auditCategory", frm.value).subscribe((resp: any) => {
        if (resp) {
          alert("category list added");
          // this.getList();
          window.location.reload();
        }
      });
    }
  }
}
