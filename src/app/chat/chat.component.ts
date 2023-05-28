import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messageFormControl = new FormControl('');

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  send() {
    const message = this.messageFormControl.value;
    this.chatService.update(message);
    this.messageFormControl.setValue("");
  }

  getChats() {
    return this.chatService.getChats();
  }

  closeChat() {
    this.chatService.chatActive = false;
  }

  isChatActive() {
    return this.chatService.isChatActive();
  }

}
