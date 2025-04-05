import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { CoreApiService } from "src/app/services/core-api.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginUserData = {
    email: "",
    password: "",
  };
  cadId: any;
  messages: any;
  messageLoops: any = [];
  blinking_text: any[] = [];
  index = 0;
  intervalTime = 5;
  env: { production: boolean; url: string };

  constructor(
    private auth: AuthService,
    private api: CoreApiService,
    private router: Router
  ) {
    this.env = environment;
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (user && token) {
      this.router.navigate(["/dashboard"]);
    }
    this.getMessage();
  }

  ngOnInit() {}

  getMessage() {
    const data = { alert_message: true, is_inactive: false };
    this.api.get("message/common", data).subscribe((resp: any) => {
      this.messages = resp.data;
      console.log(this.messages);
          const blinking_text= []
          const b_text= blinking_text.push(document.getElementsByClassName('blink_effect'))
    console.log(">>>>>>",blinking_text[0][0]);
          setInterval(function() {
              b_text[0][0].style.display = (b_text[0][0].style.display == 'none' ? '' : 'none');
          }, 1200);
    this.messageLoops.push(
      setInterval(() => {
        const imgElem = document.getElementById("blinking-text");
        imgElem.classList.remove("animate__fadeOut");
        if (this.index != this.messages.length) {
          this.index++;
        } else {
          this.index = 0;
        }
        setTimeout(() => {
          imgElem.classList.add("animate__fadeOut");
        }, (this.intervalTime - 1) * 1000);
      }, this.intervalTime * 1000)
    );
    });
  }

  toggleVisibility() {
    //   const blinkingText = document.getElementById('blinking-text');
    // console.log(">>>>>>>",blinkingText);
    //   blinkingText.style.visibility = (blinkingText.style.visibility === 'hidden') ? 'visible' : 'hidden';
    //   setInterval(() => {
    //     this.toggleVisibility();
    //   }, 1000);
  }

  loginSubmit(frm: NgForm) {
    console.log(frm.form.value);

    this.auth.login(frm.form.value).subscribe((resp: any) => {
      if (resp) {
        localStorage.setItem("token", resp.token);
        localStorage.setItem("user", JSON.stringify(resp));
        this.router.navigate(["/dashboard"]);
      }
    });
  }

  onVerify(frm: NgForm) {
    console.log(frm.form.value);
    if (frm.form.value.authEmail) {
      const f = frm.form.value;
      const frmData = {
        page: 1,
        limit: 10,
        is_inactive: false,
        role: "user",
        email: f.authEmail,
        // mobile: f.authMobile,
      };
      this.api.get("user/verify", frmData).subscribe((resp: any) => {
        if (resp) {
          this.cadId = resp.data.filter((o: any) => {
            if (o.email == f.authEmail) {
              return o._id;
            }
          });
          console.log("CADIDATE ID>>>>", this.cadId[0]._id);
          this.router.navigate(["/verify-candidate/", this.cadId[0]._id]);
        } else {
          if (confirm("User Not Registered !!!!")) {
            this.router.navigate(["/"]);
          }
        }
      });
    } else {
      if (confirm("Please fill all Details")) {
        this.router.navigate(["/"]);
      }
    }
  }

  ngOnDestroy() {}
}
