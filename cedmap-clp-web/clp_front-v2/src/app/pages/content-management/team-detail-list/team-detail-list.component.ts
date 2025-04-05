import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: 'app-team-detail-list',
  templateUrl: './team-detail-list.component.html',
  styleUrls: ['./team-detail-list.component.scss']
})
export class TeamDetailListComponent implements OnInit {
  is_inactive = false;
  teamList: any;
  selectedImage: File | null = null;
  constructor(private api: CoreApiService, private router: Router) {
    this.getTeamList();
   }
  getTeamList() {
    this.api.get("teamDetails", {}).subscribe((resp: any) => {
      if (resp) {
        this.teamList = resp.data;
        console.log(this.teamList); // Log to check if images are loaded
      }
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }
  deleteTeam(id: any) {
    if (confirm("Are you sure you want to delete this Team Details?")) {
      this.api.delete("teamDetails", id).subscribe((resp: any) => {
        if (resp) {
          alert("Team Details deleted successfully!");
          this.getTeamList();
        } else {
          alert(resp);
        }
      });
    }
  }
  ngOnInit(): void {
    // this.getTeamList();
  }
}
