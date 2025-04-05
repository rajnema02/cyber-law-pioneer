import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-default-layout",
  templateUrl: "./default-layout.component.html",
  styleUrls: ["./default-layout.component.scss"],
})
export class DefaultLayoutComponent implements OnInit {
  exam_id: any;

  constructor(
    private api: CoreApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    this.exam_id = sessionStorage.getItem("examId");
    console.log(this.exam_id);
  //   this.route.params.subscribe((param: any) => {
  //     console.log(param);
  //     if (param.id) {
  //       this.examId = param.id;
  //       console.log(this.examId);
  //     } else {
  //       alert("No exam Found!!!!");
  //     }
  //   });
  }
}
