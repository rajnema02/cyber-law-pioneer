import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: 'app-service-offer-list-course',
  templateUrl: './service-offer-list-course.component.html',
  styleUrls: ['./service-offer-list-course.component.scss']
})
export class ServiceOfferListCourseComponent implements OnInit {
  coursesList: any;

  constructor(private api: CoreApiService, private router: Router) {
    this.getCourseList();
  }

  ngOnInit(): void {
  }

  getCourseList() {
    this.api.get("servicesOffersCourses", {}).subscribe((resp: any) => {
      if (resp) {
        this.coursesList = resp.data;
      }
    });
  }

  deleteCourse(id: any) {
    if (confirm("Are you sure you want to delete this Course?")) {
      this.api.delete("courseOffers", id).subscribe((resp: any) => {
        if (resp) {
          alert("Course deleted successfully!");
          this.getCourseList();
        } else {
          alert(resp);
        }
      });
    }
  }
}