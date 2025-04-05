import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageListComponent } from './message-list/message-list.component';
import { CreateMessageComponent } from './create-message/create-message.component';
import { StudentMessageListComponent } from './student-message-list/student-message-list.component';


const routes: Routes = [
  {
    path: 'message-list',
    component: MessageListComponent
  },
  {
    path: 'student-message-list',
    component: StudentMessageListComponent
  },
  {
    path: 'create-message',
    component: CreateMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
