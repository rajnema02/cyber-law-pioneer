import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { AddmoduleComponent } from "./addmodule/addmodule.component";
import { ModulelistComponent } from "./modulelist/modulelist.component";
import { ModuleupdateComponent } from "./moduleupdate/moduleupdate.component";

const routes: Routes = [
  {
    path: "course-create",
    component: CreateComponent,
  },
  {
    path: "course-update/:id",
    component: EditComponent,
  },
  {
    path: "course-list",
    component: ListComponent,
  },
  {
    path: "add-module",
    component: AddmoduleComponent,
  },
  {
    path: "module-list",
    component: ModulelistComponent,
  },
  {
    path: "module-update/:id",
    component: ModuleupdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
