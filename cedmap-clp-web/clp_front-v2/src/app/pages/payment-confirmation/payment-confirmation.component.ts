import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
import { interval } from 'rxjs';

@Component({
  selector: "app-payment-confirmation",
  templateUrl: "./payment-confirmation.component.html",
  styleUrls: ["./payment-confirmation.component.scss"],
})
export class PaymentConfirmationComponent implements OnInit {
  responseCode: string;
  transaction_status: boolean = false;
  orderId: any;
  trnAmt: any;
  statusCode: any;
  statusDesc: any;
  trnReqDate: any;
  pgMeTrnRefNo: any;



  isButtonDisabled = false;
  buttonText = 'Back To Dashbord';
  countdownSeconds = 20;
  constructor(
    private api: CoreApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Use ActivatedRoute to get the query parameters
    this.route.queryParams.subscribe((params) => {
      if (params["pgMeTrnRefNo"]) {
        if (params["responseCode"]) {
          if (params["responseCode"] == "00") {
            this.responseCode = params["responseCode"];
            this.orderId = params["orderId"];
            this.trnAmt = params["trnAmt"];
            this.statusCode = params["statusCode"];
            this.statusDesc = params["statusDesc"];
            this.trnReqDate = params["trnReqDate"];
            this.pgMeTrnRefNo = params["pgMeTrnRefNo"];
            console.log("TRANSTACTION SUCCESS");
            console.log("TRANSTACTION SUCCESS", this.responseCode);
            this.transaction_status = true;
          } else {
            this.pgMeTrnRefNo = params["pgMeTrnRefNo"];
            this.responseCode = params["responseCode"];
            this.orderId = params["orderId"];
            this.trnAmt = params["trnAmt"];
            this.statusCode = params["statusCode"];
            this.statusDesc = params["statusDesc"];
            this.trnReqDate = params["trnReqDate"];
            console.log("TRANSTACTION Failed");
            console.log("TRANSTACTION Failed", this.responseCode);
            this.transaction_status = false;
          }
        }
      } else {
        this.responseCode = params["responseCode"];
        this.orderId = params["orderId"];
        this.trnAmt = params["trnAmt"];
        this.statusCode = params["statusCode"];
        this.statusDesc = params["statusDesc"];
        this.trnReqDate = params["trnReqDate"];
        console.log("TRANSTACTION Failed");
        this.transaction_status = false;
      }
      // =&orderId=1000140&trnAmt=&authNStatus=&authZStatus=&captureStatus=&rrn=&authZCode=&responseCode=1720&trnReqDate=&statusCode=F&statusDesc=Merchant%20request%20is%20from%20invalid%20source&addField1=&addField2=&addField3=&addField4=&addField5=&addField6=&addField7=&addField8=&addField9=NA&addField10=NA
    });
  }

  ngOnInit(): void {
        const timer$ = interval(1000); // Create an observable that emits every second

  timer$.subscribe(() => {
    this.countdownSeconds--;

    if (this.countdownSeconds <= 0) {
      this.isButtonDisabled = true;
      this.buttonText = 'Redirecting...';
      // Perform redirection logic here, e.g., using Angular Router
      // this.router.navigate(['/redirect-page']);
      this.router.navigate(['/dashboard']);
      // For now, let's simulate a redirection after 2 seconds
      setTimeout(() => {
        // Replace the following line with your actual redirection logic
        // alert('Redirect to a certain page');
      }, 2000);
    }
  });
}

buttonClicked() {
  this.isButtonDisabled = true;
  this.buttonText = 'Redirecting...';
  this.router.navigate(['/dashboard']);
  // Handle button click logic here
  // This will be executed when the user clicks the button manually
}
convertToInteger(value: string): number {
  return parseInt(value, 10);
}
}
