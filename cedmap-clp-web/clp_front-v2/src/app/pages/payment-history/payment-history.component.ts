import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-payment-history",
  templateUrl: "./payment-history.component.html",
  styleUrls: ["./payment-history.component.scss"],
})
export class PaymentHistoryComponent implements OnInit {
  user: any;
  env: { production: boolean; url: string };
  role: any;
  userList: any;
  listCount: any;
  page: any= 1;
  limit: any =20;

  constructor(private api: CoreApiService, private router: Router) {
    this.user = JSON.parse(localStorage.getItem("user" || "{}"));
    this.env = environment;
    this.role = this.user.role;
    if (this.role == "admin" || this.role == "super-admin") {
      this.getPaymentList();
    } else if (this.role == "admin-read") {
      // this.getPaymentList();
    } else if (this.role == "user") {
      this.getPaymentList();

      // this.getStudentsCertificates();
    } else if (this.role == "demo-user") {
      // this.getUser();
    }
  }

  ngOnInit(): void {}

  getPaymentList() {
    const query = {
      page: this.page,
      limit: this.limit,
    };
    if (this.role === "user") {
      query["userId"] = this.user.id;
    }
    this.api.get("payment", query).subscribe((resp: any) => {
      if (resp) {
        console.log(resp.data);

        this.userList = resp.data;
        this.listCount = resp.meta.total;
      }
    });
  }

  convertToInteger(value: string): number {
    return parseInt(value, 10);
  }
}
