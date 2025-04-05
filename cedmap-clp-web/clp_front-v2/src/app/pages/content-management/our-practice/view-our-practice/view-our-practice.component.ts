import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-our-practice',
  templateUrl: './view-our-practice.component.html',
  styleUrls: ['./view-our-practice.component.scss']
})
export class ViewOurPracticeComponent implements OnInit {
  title: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.title = params.get('title');  
    });
  }

}
