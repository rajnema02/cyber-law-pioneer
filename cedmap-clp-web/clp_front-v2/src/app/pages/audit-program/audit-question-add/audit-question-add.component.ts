import { HttpEventType } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { log } from "console";
import { CoreApiService } from "src/app/services/core-api.service";
import { FileService } from "src/app/services/file.service";

@Component({
  selector: "app-audit-question-add",
  templateUrl: "./audit-question-add.component.html",
  styleUrls: ["./audit-question-add.component.scss"],
})
export class AuditQuestionAddComponent implements OnInit {
  questionList: any;
  is_inactive: Boolean = false;
  isBulkUpload: Boolean = false
  ckeConfig: any
  uploadButtonStatus: boolean = false;
  selectedFile: any;
  questionFile: any;



  constructor(
    private api: CoreApiService,
    private router: Router,
     private fs: FileService
    ) {
    this.ckeConfig = {
      height: 100,
      extraPlugins: 'eqneditor',
      // filebrowserImageUploadUrl: ${environment.url}/file/uploadCkeditor?,
    }
    this.getList();
  }

  ngOnInit(): void { }


  onClickBlukUpload() {
    this.isBulkUpload = true
  }
  getList() {
    const query = {
      is_inactive: this.is_inactive,
    };
    this.api.get("auditCategory", query).subscribe((resp: any) => {
      if (resp) {
        this.questionList = resp.data;
        console.log(resp);
      }
    });
  }

  onSubmit(frm: NgForm) {
    // console.log(" quesiton createsd", frm.value);
    if (frm.form.invalid) {
      alert("Please fill all the necessary details");
    } else {
      this.api.post("auditQuestion", frm.value).subscribe((resp: any) => {
        if (resp) {
          alert("Quesiton Added");
          window.location.reload();
        }
      });
    }
  }

  onFileSelected(e: any) {
    if (e.target.files.length) {
      if (e.target.files[0].type == 'text/csv') {
        this.selectedFile = e.target.files[0];
        console.log("Image File", this.selectedFile);
        // this.payment_2();
        this.uploadButtonStatus = true
      } else {
        alert("Please upload file in csv format")
      }
    } else {
      this.selectedFile = null;
    }

    if (this.selectedFile) {
      this.fs.uploadFile(this.selectedFile).subscribe((res: any) => {
        if (res.type == HttpEventType.Response) {
          const body: any = res.body;
          this.questionFile = body.file.path;

          // alert('File Uploaded Successfully');
        }
      });
    } else {
      alert('Select File to upload');
    }
  }
  onBulkSubmit(frm: NgForm) {
    if (frm.form.invalid) {
      alert("Please fill all form values");
    } else {
      const quesData={
        quesFile:this.questionFile,
        ...frm.form.value
      }
      console.log("BLUK Upload>?>?", quesData);

      this.api.post("auditQuestion/uploadBulkQuestion", quesData).subscribe((resp: any) => {
        if (resp) {
          alert(resp.message);
          this.router.navigate(["/audit/audit-question-list"]);
        } else {
          alert(resp.message);
        }
        // console.log(resp);
      });
    }
  }
}
