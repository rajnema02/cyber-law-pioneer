import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: 'app-partner-project-list',
  templateUrl: './partner-project-list.component.html',
  styleUrls: ['./partner-project-list.component.scss']
})
export class PartnerProjectListComponent implements OnInit {
  is_inactive = false;
  projectList:any
  constructor(private api: CoreApiService, private router: Router) {
    this.getProjectList()
   }

  ngOnInit(): void {
  }
  getProjectList() {
    this.api.get("project", {}).subscribe((resp: any) => {
      if (resp) {

        this.projectList = resp.data;
      }
    });
}
deleteProject(id: any) {
  if (confirm("Are you sure you want to delete this Project?")) {
    this.api.delete("project", id).subscribe((resp: any) => {
      if (resp) {
        alert("Project deleted successfully!");
        this.getProjectList();
      } else {
        alert(resp);
      }
    });
  }
}

}
