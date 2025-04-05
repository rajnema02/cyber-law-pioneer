import { Component, OnInit } from '@angular/core';

import { MatStepper } from '@angular/material/stepper';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent  {

  courceUserData = {
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
    password: '',
  }


  method(first:any,stepper:any){
    first.completed = true,
    stepper.next();
  }

  method2(second:any,stepper:any){
    second.completed = true,
    stepper.next();
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
   }

  submit() {
    console.log(this.courceUserData)
  }



  ngOnInit(): void {
  }

}
