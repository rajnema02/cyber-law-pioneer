import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { CoreApiService } from "src/app/services/core-api.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  user: any;
  userDetail: any;
  env: { production: boolean; url: string; };
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private api: CoreApiService,
    private authService: AuthService
  ) {
    this.location = location;
    this.env = environment;
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.id) {
      this.api.getById("user", this.user.id).subscribe((resp: any) => {
        // console.log("navbarResp>>", resp.profile_photo);

        this.userDetail=  resp.profile_photo
      });
    }
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  logout() {
    this.authService.logout();
  }
}
