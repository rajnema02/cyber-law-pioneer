import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';

@Component({
  selector: 'app-student-certificates',
  templateUrl: './student-certificates.component.html',
  styleUrls: ['./student-certificates.component.scss']
})
export class StudentCertificatesComponent implements OnInit {
userId: any;
reportList: any =[];
  constructor(private api: CoreApiService) { }

  ngOnInit(): void {
   const user = JSON.parse(localStorage.getItem("user"));
    this.userId = user.id;
    this.getStudentsCertificates();

  }

  getStudentsCertificates(){
    this.api.get('examReport/getStudentCertificates', {studentId: this.userId}).subscribe((resp: any)=>{
      if(resp.success){
        this.reportList = resp.reports;
console.log(this.reportList)
      }else{
        alert(resp.message);
      }
    })
  }

}
