import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';

@Component({
  selector: 'app-exam-submit',
  templateUrl: './exam-submit.component.html',
  styleUrls: ['./exam-submit.component.scss']
})
export class ExamSubmitComponent implements OnInit {

  constructor(private api: CoreApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  goBackToHome() {
    this.router.navigate(["/dashboard"]);
  }
}
