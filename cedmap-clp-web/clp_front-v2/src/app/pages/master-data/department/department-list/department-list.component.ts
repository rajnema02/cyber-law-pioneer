import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  courseList: any;
  env: any;
  constructor(private api: CoreApiService) {
    this.env = environment;
    this.getProgramList();
  }

  getProgramList() {
    this.api.get("department", {}).subscribe((resp: any) => {
      if (resp) {
        console.log(resp);

        this.courseList = resp.data;
      }
    });
  }

  ngOnInit(): void {}
  disableMessage(id: any) {
    if (confirm("Do you really want to disable this data?")) {
      this.api.delete("about-program", id).subscribe((resp: any) => {
        console.log(resp);
        if (resp) {
          alert("Data is successfully disabled.");
          this.getProgramList();
        }
      });
    }
  }
}
