import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthPermissionService {

  constructor() { }

  private permissions = {
    sidebar: {
      batch_details: [],
      user_management: [],
      studt_material: [],
      course_details: []
    },
    dashboard: {
      verify_profile: [],
      view_receipt: [],
      view_profile: [],

    },
    batch: {
      new_batch: [],
      update_batch: [],
      delete_batch: [],
      allot_batch: [],


    },
    course: {
      new_course: [],


    },
    study_material:{
      add_new_videos: [],
    }


  }
}
