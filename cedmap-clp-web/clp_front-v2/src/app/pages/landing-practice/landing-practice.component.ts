
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: 'app-landing-practice',
  templateUrl: './landing-practice.component.html',
  styleUrls: ['./landing-practice.component.scss']
})
export class LandingPracticeComponent implements OnInit {
  programTitle: string | null = '';
  practiceList: any = [];
  filteredPracticeList: any = [];

  constructor(private route: ActivatedRoute, private api: CoreApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.programTitle = params.get('title');  
      this.getPartnerList(); 
    });
  }

  getPartnerList() {
    // Fetch practice data from the API
    this.api.get("practice", {}).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.practiceList = resp.data;
        console.log("All Practices: ", this.practiceList);

        // Filter practices where the service matches the programTitle
        this.filteredPracticeList = this.practiceList.filter(practice => {
          return practice.service && this.programTitle && practice.service.toLowerCase() === this.programTitle.toLowerCase();
        });
        console.log("Filtered Practices: ", this.filteredPracticeList);
      }
    });
  }
}
