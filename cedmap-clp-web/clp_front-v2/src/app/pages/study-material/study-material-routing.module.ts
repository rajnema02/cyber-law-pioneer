import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialCreateComponent } from './material-create/material-create.component';
import { MaterialListComponent } from './material-list/material-list.component';
import { StudentStudyListComponent } from './student-study-list/student-study-list.component';

const routes: Routes = [
  {
    path: 'study-create',
    component: MaterialCreateComponent
  },
  {
    path: 'study-list',
    component: MaterialListComponent
  },
  {
    path: 'student-study-list',
    component: StudentStudyListComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyMaterialRoutingModule { }
