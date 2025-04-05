import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { CoreApiService } from 'src/app/services/core-api.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {

  examReportId: any;
  examId: any;
  examReportData: any;
  examData: any;
  fromDate: any;
  toDate: any;
  full_name: any;
  course_type: any;
  course_name: any;
  grade: any;



  constructor(private route: ActivatedRoute, private api: CoreApiService) { }


  ngOnInit(): void {
    this.route.params.subscribe((params: any)=>{
      this.examReportId = params.id;
      this.api.get('examReport/getExamReport', {id: this.examReportId}).subscribe((resp: any)=>{
        if(resp){
          if(resp.Result == 'Pass'){
            this.grade = 'A+'
          }else{
            this.grade = 'B'
          }
          console.log(resp);
          this.full_name = resp.Student_name;
          this.examReportData = resp;
          const examId = resp.Exam_id;

          this.api.getById('exam',examId).subscribe((resp: any)=>{
            console.log(resp);
            this.examData = resp;
            this.course_name = resp.course_name;
            this.course_type = resp.course_type;
            const batchId = resp.batch_id[0];
            this.api.getById('batch', batchId).subscribe((resp: any)=>{
              console.log(resp);
              this.fromDate = resp.startDate;
              this.toDate = resp.endDate;
            })
          })

        }
      })




    })
  }

  getExamReport(){

  }

}
