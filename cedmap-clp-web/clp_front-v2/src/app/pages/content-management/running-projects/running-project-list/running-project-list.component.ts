import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: 'app-running-project-list',
  templateUrl: './running-project-list.component.html',
  styleUrls: ['./running-project-list.component.scss']
})
export class RunningProjectListComponent implements OnInit {
  is_inactive = false;
  runningProjectList:any

  constructor(private api: CoreApiService, private router: Router) {
    this.getRunningProjectsList()
   }

  ngOnInit(): void {
  }
  getRunningProjectsList() {
    this.api.get("runningProjects", {}).subscribe((resp: any) => {
      if (resp) {

        this.runningProjectList = resp.data;
      }
    });
}
deleteRunningProjects(id: any) {
  if (confirm("Are you sure you want to delete this Project?")) {
    this.api.delete("runningProjects", id).subscribe((resp: any) => {
      if (resp) {
        alert("Project deleted successfully!");
        this.runningProjectList();
      } else {
        alert(resp);
      }
    });
  }
}
}
