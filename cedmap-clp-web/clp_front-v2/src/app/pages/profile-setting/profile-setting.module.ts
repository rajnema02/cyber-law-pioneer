import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileSettingRoutingModule } from './profile-setting-routing.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ForgetPasswordComponent,
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileSettingRoutingModule,
    FormsModule
  ]
})
export class ProfileSettingModule { }
