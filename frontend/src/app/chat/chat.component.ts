import { Component } from '@angular/core';
import { Message } from '../message.model';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: Message[] = [];

  constructor(private chatService: ChatService) { }

  handleMessageSent(message: string) {
    const userMessage: Message = { sender: 'user', text: message };
    this.messages.push(userMessage);

    this.chatService.sendMessage(message).subscribe(response => {
      const botMessage: Message = { sender: 'bot', text: response.response };
      this.messages.push(botMessage);
    });
  }
}
