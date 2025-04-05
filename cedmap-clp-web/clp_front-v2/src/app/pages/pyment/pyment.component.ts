import { Component, OnInit } from '@angular/core';
import { AdminLayoutRoutes } from '../../layouts/admin-layout/admin-layout.routing';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pyment',
  templateUrl: './pyment.component.html',
  styleUrls: ['./pyment.component.scss']
})
export class PymentComponent implements OnInit {





  pymentUserData = {



    name: '',
   card_number: '',
   expiry_date: '',
   cvv: '',
   email: '',
   currency: ''

  }

  paymentUser(){
    console.log(this.pymentUserData)
  }

  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

}
