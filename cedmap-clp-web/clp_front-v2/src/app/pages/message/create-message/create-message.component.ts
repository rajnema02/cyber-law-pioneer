import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
import { HttpEventType } from "@angular/common/http";
import { FileService } from "src/app/services/file.service";

@Component({
  selector: "app-create-message",
  templateUrl: "./create-message.component.html",
  styleUrls: ["./create-message.component.scss"],
})
export class CreateMessageComponent implements OnInit {
  batchList: any;
  pdfFile: any;
  file_link: any;
  messageType: any;
  alert_message: any;

  constructor(
    private api: CoreApiService,
    private fs: FileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBatches();
  }

  getBatches() {
    this.api.get("batch", {}).subscribe((resp: any) => {
      this.batchList = resp.data;
      console.log(resp);
    });
  }
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
  submit(form: any) {
    const f = form.form.value;
    if (this.messageType == "batch") {
      this.alert_message= false

    }else{
      this.alert_message = true
    }
    const formData = {
      message_description: f.message_description,
      file_path: this.file_link,
      alert_message: this.alert_message,
      batch_id:f.batch_id,
    };
    this.api.post("message", formData).subscribe((resp: any) => {
      console.log(resp);
      this.router.navigate(["/message/message-list"]);
    });
  }
}
