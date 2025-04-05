import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

is_inactive = false;
userList: any;

  constructor(private api: CoreApiService, private router: Router) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {

    const queryData = {

      is_inactive: this.is_inactive,
      role: "!user",
    }
    this.api.get("user", queryData).subscribe((resp: any) => {
      this.userList = resp.data;

      console.log("this.userList", resp);

    });

  }

}
