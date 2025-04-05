import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CenterRoutingModule } from "./center-routing.module";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [CreateComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    CenterRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
})
export class CenterModule {}
