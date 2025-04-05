import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  messageList: any;
  constructor(private api: CoreApiService) { }

  ngOnInit(): void {
    this.getMessageList();
  }

  getMessageList(){
    this.api.get('message/common', { disable: false, is_inactive: false}).subscribe((resp: any)=>{
      this.messageList = resp.data;

    })

  }
  disableMessage(id: any){
    if(confirm('Do you really want to disable this message?')){
      this.api.get(`message/disableMessage/${id}`,{}).subscribe((resp: any)=>{
        console.log(resp);
        if(resp){

          alert('Message is successfully disabled.');
          this.getMessageList();

        }
      })
    }


  }


}
