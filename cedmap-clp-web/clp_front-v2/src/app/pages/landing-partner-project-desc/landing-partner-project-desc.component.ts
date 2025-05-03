import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';

@Component({
  selector: 'app-landing-partner-project-desc',
  templateUrl: './landing-partner-project-desc.component.html',
  styleUrls: ['./landing-partner-project-desc.component.scss']
})
export class LandingPartnerProjectDescComponent implements OnInit {


  coursesList: any = [];
  filteredCourses: any = [];
  programName: string = '';

  constructor(
    private route: ActivatedRoute,
    private api: CoreApiService
  ) {}

  ngOnInit(): void {
    this.programName = this.route.snapshot.paramMap.get('program') || '';
    this.getCourseList();
  }

  getCourseList() {
    this.api.get('servicesOffersCourses', {}).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.coursesList = resp.data;
        this.filteredCourses = this.coursesList.filter(
          (course: any) => course.program?.toLowerCase() === this.programName.toLowerCase()
        );
      }
    });
  }

  extractYoutubeId(url: string): string {
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  }
  
}





