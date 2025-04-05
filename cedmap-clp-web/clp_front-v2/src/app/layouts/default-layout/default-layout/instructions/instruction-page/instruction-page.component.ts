import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instruction-page',
  templateUrl: './instruction-page.component.html',
  styleUrls: ['./instruction-page.component.scss']
})
export class InstructionPageComponent implements OnInit {
exam_id: any;
  constructor() { }

  ngOnInit(): void {
    this.exam_id = sessionStorage.getItem("examId");
    console.log(this.exam_id);
  }

}
