import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  is_inactive = false;
  userList: any;

  constructor(private api: CoreApiService, private router: Router) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    const queryData = {
      role: ["admin", "admin-read"],
      // role: { $in: ["admin", "admin-read"] },
      // role: { $exists: true },
      is_inactive: this.is_inactive,
    };
    this.api.get("user", queryData).subscribe((resp: any) => {
      console.log("response", resp);
      this.userList = resp.data.filter((o: any) => {
        if (o.role != "user" && o.role != "super-admin") {
          return o;
        }
      });
      console.log("this.userList", this.userList);
    });
  }
}
