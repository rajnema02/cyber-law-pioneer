import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contactList:any
  constructor(private api: CoreApiService, private router: Router) {
    this.getContactList();
   }

  ngOnInit(): void {
  }
  getContactList() {
    this.api.get("contact", {}).subscribe((resp: any) => {
      if (resp) {

        this.contactList = resp.data;
      }
    });
}
deleteContact(id: any) {
  if (confirm("Are you sure you want to delete this contact details?")) {
    this.api.delete("contact", id).subscribe((resp: any) => {
      if (resp) {
        alert("contact deleted successfully!");
        this.getContactList();
      } else {
        alert(resp);
      }
    });
  }
}
}
