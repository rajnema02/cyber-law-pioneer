import { HttpEventType } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { log } from "console";
import { CoreApiService } from "src/app/services/core-api.service";
import { FileService } from "src/app/services/file.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-audit-questionnare-list-view",
  templateUrl: "./audit-questionnare-list-view.component.html",
  styleUrls: ["./audit-questionnare-list-view.component.scss"],
})
export class AuditQuestionnareListViewComponent implements OnInit {
  is_inactive: boolean = false;
  question_category: any;
  questions: any;
  selectedQuestion: any;
  query_id: any;
  userView: Boolean = true;
  queryData: any;
  env: { production: boolean; url: string };
  user: any;
  pdfFile: any;
  file_link: any;

  constructor(
    private api: CoreApiService,
    private router: Router,

    private fs: FileService,
    private route: ActivatedRoute
  ) {
    this.env = environment;
    this.user = JSON.parse(localStorage.getItem("user" || "{}"));

    this.route.params.subscribe((param: any) => {
      this.query_id = param.id;
      this.api
        .getById("auditQuestionQuery", this.query_id)
        .subscribe((resp: any) => {
          console.log("respp>>>>>>>", resp);
          this.queryData = resp.result;
        });
    });
  }



  ngOnInit(): void { }



  uploadpdf(e: any) {
    if (e.target.files.length) {
      this.pdfFile = e.target.files[0];
      this.pdf();
    } else {
      this.pdfFile = null;
    }
  }
  pdf() {
    if (this.pdfFile) {
      this.fs.uploadFile(this.pdfFile).subscribe((res: any) => {
        if (res.type == HttpEventType.Response) {
          const body: any = res.body;
          this.file_link = body.file.path;
          // this.as.successToast(res.msg)
        }
      });
    } else {
      alert("Select pdf");
    }
  }
  onSubmit(frm: NgForm) {
    if (!frm.form.valid) {
      alert("Fill all Required value")
    }else{
      console.log("FormUPDATE", frm.value);
      const formData = {
        ...frm.value,
        reply_docs: this.file_link
      }
      console.log("FORM DFATA TO UPDATE", formData);
      this.api.put("auditQuestionQuery", this.query_id, formData).subscribe((resp: any) => {
        if (resp) {
          alert('Response sent successfully')
          window.location.reload()
        }
      })

    }
  }
}
