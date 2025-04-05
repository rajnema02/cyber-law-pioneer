import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';

@Component({
  selector: 'app-re-schedule-exam-form',
  templateUrl: './re-schedule-exam-form.component.html',
  styleUrls: ['./re-schedule-exam-form.component.scss']
})
export class ReScheduleExamFormComponent implements OnInit {
examId: any;
duration: any = "--";
examData: any;


  constructor(private api: CoreApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any)=>{
      this.examId = params.id;
      console.log(this.examId);
      this.api.get(`exam/${this.examId}`,{} ).subscribe((resp: any)=>{
        console.log(resp);
        this.examData = resp;

      })
    })

  }
  checkDate(dateValue: any){
    console.log(dateValue);
    const todaysDate =new Date;
    const selectedDate= new Date(dateValue)
    todaysDate.setDate(todaysDate.getDate()+ 2);

    if(todaysDate > selectedDate ){
      alert('Please select a date which is 3 days later from today!');

    }
}

  submit(frm: any){
    if(!frm.form.invalid){
    console.log(frm.form.value);
    const newExamData = frm.form.value;
    const exam_id = this.examId;
    const data ={
      newExamData,
      exam_id
    }



    this.api.post("exam/reScheduleExam",data).subscribe((resp: any)=>{
      console.log(resp);
    })
  }else{
    alert("Please fill required filled!!");
    return
  }
  }

}
