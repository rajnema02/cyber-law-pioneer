import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-moduleupdate",
  templateUrl: "./moduleupdate.component.html",
  styleUrls: ["./moduleupdate.component.scss"],
})
export class ModuleupdateComponent implements OnInit {
  moduleId: any;
  moduleData: any;
  constructor(
    private api: CoreApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param: any) => {
      this.moduleId = param.id;
      if (this.moduleId) {
        this.fetchModule();
      }
    });
  }

  fetchModule() {
    this.api.getById("coursemodule", this.moduleId).subscribe((resp: any) => {
      this.moduleData = resp;
    });
  }

  submit(frm: any) {
    if (frm.form.invalid) {
      alert("Please fill all the necessary details");
    } else {
      this.api
        .put("coursemodule", this.moduleId, frm.form.value)
        .subscribe((resp: any) => {
          if (resp) {
            alert("Module Updated Successfully!!!");
            this.router.navigate(["/course/module-list"]);
          }
        });
    }
  }

  ngOnInit(): void {}
}
