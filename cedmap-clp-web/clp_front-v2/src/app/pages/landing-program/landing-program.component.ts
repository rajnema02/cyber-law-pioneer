import { Component, OnInit } from "@angular/core";
import { CoreApiService } from "src/app/services/core-api.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-landing-program",
  templateUrl: "./landing-program.component.html",
  styleUrls: ["./landing-program.component.scss", "./base.css"],
})
export class LandingProgramComponent implements OnInit {
  items = [
    { title: 'Training Program for govt. organization', icon: '../../../../assets/icon/engineer.png' },
    { title: 'Internship & Industrial Training', icon: '../../../../assets/icon/solution.png' },
    { title: 'Certification Courses', icon: '../../../../assets/icon/data-transmission.png' },
  ];
  constructor(private api: CoreApiService,private router: Router) {}
  

  ngOnInit(): void {}
  redirectToRoute(title: string): void {
    this.router.navigate(['programs/:title', title]);  
  }
}
