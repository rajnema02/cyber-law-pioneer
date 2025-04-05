import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  courseList: any = [];
  course_type: any;
  course_name: any;
  notGeneral: Boolean = false;
  four_option: Boolean = true;


  constructor(private api: CoreApiService,
              private router: Router ) { }

  ngOnInit(): void {
  }

  submit(frm: any){
    console.log(frm.form.value);
    this.api.post("question",frm.form.value).subscribe((resp: any)=>{
      // console.log(resp);
      this.router.navigate(['/exam/question-bank']);
    })

  }

  getCourseList(){
    this.courseList = [];
    if(this.course_type == 'General'){
      this.notGeneral = false;
    }else{
      this.notGeneral = true;
      const cType ={
        course_type:  this.course_type
      }
      // console.log(cType);

      this.api.get("course",cType).subscribe((resp: any)=>{
        // console.log(resp);

        // if (resp) {
          this.courseList = resp.data;
        // }
      })
    }
  }

  optionChange(evt: any){
    const optionVal= evt.target.value;
    if(optionVal == "2"){
      this.four_option = false
    }else if(optionVal == "4"){
      this.four_option = true;

    }


  }

}
