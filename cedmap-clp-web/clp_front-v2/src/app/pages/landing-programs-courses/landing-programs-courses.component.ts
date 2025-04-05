import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: 'app-landing-programs-courses',
  templateUrl: './landing-programs-courses.component.html',
  styleUrls: ['./landing-programs-courses.component.scss']
})
export class LandingProgramsCoursesComponent implements OnInit {
  programTitle: string | null = '';
  programList: any = [];
  filteredProgramList: any = [];

  constructor(private route: ActivatedRoute, private api: CoreApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.programTitle = params.get('title');  
      this.getProgramList(); 
    });
  }
  getProgramList() {
    this.api.get("servicesOffers", {}).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.programList = resp.data;
        console.log("All Programs ", this.programList);

        this.filteredProgramList = this.programList.filter(program => {
          return program.service && this.programTitle && program.service.toLowerCase() === this.programTitle.toLowerCase();
        });
        console.log("Filtered programs: ", this.filteredProgramList);
      }
    });
  }

}
