import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';
import { FileService } from 'src/app/services/file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-individual-answer-sheet',
  templateUrl: './individual-answer-sheet.component.html',
  styleUrls: ['./individual-answer-sheet.component.scss']
})
export class IndividualAnswerSheetComponent implements OnInit {
  examId: any;
  studentId: any;
  answerSheet: any;
  studentDetails: any;
  env: { production: boolean; url: string; };
  studentBatch: any;

  constructor(
    private api: CoreApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fs: FileService
  ) {
    this.env = environment
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      this.studentId = param.id
      this.examId = param.examId
      this.api.getById('user', this.studentId).subscribe(async (resp: any) => {
        if (resp) {
          this.studentDetails = resp
          this.studentBatch = resp.batch
          // console.log("studentDetails", this.studentDetails);

        }
      })
      const queryData = {
        user_id: this.studentId,
        exam_id: this.examId
      }
      this.api.get('auditExam/getAnswerSheet', queryData).subscribe((resp: any) => {
        if (resp) {
          this.answerSheet = resp.data
          this.answerSheet.forEach(element => {
            return element.isAdminSuggestion = false
          });
          console.log("exam details in batch ", resp);

        }
      })
    })
  }

  getAnswerResult(evt: any, item: any) {
    item.adminStatus = evt.target.selectedOptions[0].value;

    if (item.adminStatus == 'Reject') {
      item.isAdminSuggestion = true
    }
  }
  setUserDescription(evt: any, item: any) {
    console.log('evt', evt.target);
    item.adminSuggestion = evt.target.value;
  }
  setAdminRisk(evt: any, item: any) {
    console.log('evt', evt.target);
    item.adminRisk = evt.target.value;
  }

  onSubmit() {
    console.log("Submit", this.answerSheet);
    if (confirm("Are you sure you want to submit the assessment ?")) {
      const queryData = {
        answerSheet: this.answerSheet,
        examId: this.examId,
        studentId: this.studentId
      }
      this.api.post("auditExam/syncAdminSuggestion", queryData).subscribe((resp: any) => {
        if (resp.success) {
          // this.userSubmit = true;
          alert("Assessment save successfully and Assessment report generated ")
          this.router.navigate(['/audit/student-list', this.studentBatch, this.examId])
        }
      })

    }
  }

}
