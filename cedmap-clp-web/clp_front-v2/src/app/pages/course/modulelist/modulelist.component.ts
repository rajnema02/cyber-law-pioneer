import { Component, OnInit } from "@angular/core";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-modulelist",
  templateUrl: "./modulelist.component.html",
  styleUrls: ["./modulelist.component.scss"],
})
export class ModulelistComponent implements OnInit {
  moduleList: any;

  constructor(private api: CoreApiService) {
    this.getModuleList();
  }

  ngOnInit(): void {}
  getModuleList() {
    this.api.get("coursemodule", {}).subscribe((resp: any) => {
      if (resp) {
        console.log(resp);

        this.moduleList = resp.data;
      }
    });
  }
}
