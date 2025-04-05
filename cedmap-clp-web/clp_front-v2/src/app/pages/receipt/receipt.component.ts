import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-receipt",
  templateUrl: "./receipt.component.html",
  styleUrls: ["./receipt.component.scss"],
})
export class ReceiptComponent implements OnInit {
  transId: any;
  user: any;
  payment: any;
  profileVerified: Boolean = true;
  action: any;

  constructor(private api: CoreApiService, private route: ActivatedRoute) {
    this.route.params.subscribe((param) => {
      if (param.id) {
        this.transId = param.id;
        console.log("PARAMETER >>>>>>>>>=====", param);
        console.log(param.term=='view');
        if(this.transId && param?.term =='view'){
          this.action = param.term
          this.api.getById("user", this.transId).subscribe((resp: any) => {
            this.user = resp;
            console.log(this.user);
            this.profileVerified = resp.is_profileVerified;
          });
        }
        // else if (this.transId) {
        //   const query={
        //     orderId : this.transId
        //   }
        //   this.api.get("registrationInfo", query).subscribe((resp: any) => {
        //     this.user = resp.data[0];
        //     // this.profileVerified = resp.is_profileVerified;
        //     console.log("registrationInfo>>>>>>>>>",resp);
        //   });
        //   this.api.get("payment", query).subscribe((resp: any) => {
        //     this.payment = resp.data[0];
        //     // this.profileVerified = resp.is_profileVerified;
        //     console.log(resp);
        //   });
        // }
        // else{
        //   alert("")
        // }
      }
      // else {
      //   const user = JSON.parse(localStorage.getItem("user"));
      //   this.transId = user.id;
      //   this.api.getById("user", this.transId).subscribe((resp: any) => {
      //     this.user = resp;
      //     this.profileVerified = resp.is_profileVerified;
      //     // console.log(resp);
      //   });
      // }
    });
  }

  ngOnInit(): void {}

  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    // document.body.innerHTML = originalContents;
  }
  printPage() {
    window.print();
  }
}
