import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';
import { FileService } from 'src/app/services/file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  batchId: any;
  examId: any;
  userId: any;
  examDetails: any;
  userList: any;
  BatchList: any;
  env: { production: boolean; url: string; };

  constructor(
    private api: CoreApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fs: FileService
  ) {
    this.env = environment
    this.route.params.subscribe((param: any) => {
      this.batchId = param.batchId
      this.examId = param.examId
      this.api.get('user', { batch: this.batchId, limit: 500 }).subscribe(async (resp: any) => {
        if (resp) {
          // resp.data.forEach( element => {
          for (const element of resp.data) {
            this.userId = element._id
            this.getExamSubmitStatus(element)
            // element.auditSubmit = await
          };
          console.log("User in batch ", resp.data);
          this.userList = resp.data
        }
      })
      this.api.getById('auditExam', this.examId).subscribe((resp: any) => {
        if (resp) {
          this.examDetails = resp
          console.log("exam details in batch ", resp);

        }
      })
      this.api.getById('batch', this.batchId).subscribe((resp: any) => {
        if (resp) {
          this.BatchList = resp
          console.log("exam details in batch ", resp);

        }
      })
    })
  }

  ngOnInit(): void {
  }

  getExamSubmitStatus(element: any): Promise<string> {
    const data = {
      userId: this.userId,
      examId: this.examId
    };
    console.log(data);
    return this.api.post('auditExam/getExamSubmittedStatus', data).toPromise().then((resp: any) => {
      console.log(resp);
      if (resp.message) {
        element.auditSubmit = true
        element.report = resp.data?.reportPath ? resp.data?.reportPath : false
        element.reportStatus = resp?.data?.reportStatus ? resp.data?.reportStatus : false
      } else {
        element.auditSubmit = false
        element.report = resp.data?.reportPath ? resp.data?.reportPath : false
        element.reportStatus = resp?.data?.reportStatus ? resp.data?.reportStatus : false
      }
      return element;
    });
  }

}
