import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent implements OnInit {

  coursesUser = {

    cource_code: '',
    School: '',
    company: '',
    office: '',
    block: '',
    district: '',
    pin_code: '',
    state: '',
    user_name: '',
    designation: '',
    mobile: '',
    email: '',
    whatsapp: '',
    image: '',
    identity: '',
    password: ''




}

  constructor() { }

  ngOnInit(): void {
  }

}
