import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-program',
  templateUrl: './about-program.component.html',
  styleUrls: ['./about-program.component.scss']
})
export class AboutProgramComponent implements OnInit {
  programList: any;
  env :any
  constructor(private api: CoreApiService) {
    this.env = environment;
    this.getProgramList();
   }

  ngOnInit(): void {
  }
  getProgramList() {
    this.api.get("about-program", {}).subscribe((resp: any) => {
      if (resp) {
        console.log(resp);

        this.programList = resp.data;
      }
    });
  }
}
