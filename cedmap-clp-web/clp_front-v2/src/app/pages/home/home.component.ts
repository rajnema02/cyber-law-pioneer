import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  messages: any;
  env: { production: boolean; url: string };
  constructor(
    private api: CoreApiService,
  ) {
    this.env = environment;
    this.getMessage();
   }

  ngOnInit(): void {
  }

  getMessage() {
    const data = { alert_message: true, is_inactive: false };
    this.api.get("message/common", data).subscribe((resp: any) => {
      this.messages = resp.data;
      console.log(this.messages);

    });
  }
}
