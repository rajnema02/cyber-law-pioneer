import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-project',
  templateUrl: './landing-project.component.html',
  styleUrls: ['./landing-project.component.scss']
})
export class LandingProjectComponent implements OnInit {
  projectList: any;
  filteredProjectList: any = [];
  programTitle: string | null = '';

  constructor(
    private api: CoreApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // Capture the title from the route parameters
    this.route.paramMap.subscribe(params => {
      this.programTitle = params.get('title');  // Get the program title from the route
      this.getProjectList();  // Call getProjectList after the programTitle is set
    });
  }

  getProjectList(): void {
    this.api.get("project", {}).subscribe((resp: any) => {
      if (resp) {
        this.projectList = resp.data;
        console.log("Projects: ", this.projectList);

        // Filter projects where the partnerName matches the programTitle
        this.filteredProjectList = this.projectList.filter(project => {
          return (
            project.partnerName &&
            this.programTitle &&
            project.partnerName.toLowerCase() === this.programTitle.toLowerCase()
          );
        });

        console.log("Filtered Projects: ", this.filteredProjectList);
      }
    });
  }
}
