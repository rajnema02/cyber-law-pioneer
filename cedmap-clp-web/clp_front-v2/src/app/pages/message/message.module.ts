import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageListComponent } from './message-list/message-list.component';
import { CreateMessageComponent } from './create-message/create-message.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule } from '@angular/forms';
import { StudentMessageListComponent } from './student-message-list/student-message-list.component';
import { NgxPaginationModule } from "ngx-pagination";



@NgModule({
  declarations: [
    MessageListComponent,
    CreateMessageComponent,
    StudentMessageListComponent
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    FormsModule,
    MessageRoutingModule,
    NgxPaginationModule
  ]
})
export class MessageModule { }
