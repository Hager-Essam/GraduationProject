import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../core/services/chat/chat.service';
import { DatePipe, NgForOf, NgIf, SlicePipe } from '@angular/common';
import { AuthService } from '../../core/services/Auth/auth.service';
import { Router } from '@angular/router';
import {UsernameExtractPipe} from '../../shared/UserNameExtraction';

interface Message {
  content: string;
  senderId: string;
  receiverId: string;
  sentAt: string;
  senderName: string;
  sender?: any;
  receiver?: any;
}

@Component({
  selector: 'app-chat',
  templateUrl: './specialist-chats.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgForOf,
    SlicePipe,
    UsernameExtractPipe
  ],
  styleUrls: ['./specialist-chats.component.css']
})
export class SpecialistChatsComponent implements OnInit {
  messages: Message[] = [];
  loading = false;
  errorMessage = '';
  loggedInSpecialist = '';
  selectedMessage: Message | null = null;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loggedInSpecialist = localStorage.getItem('userId') || '';
    console.log(`The logged in usererrrrrrrrrrrr as a spec is ${this.loggedInSpecialist}`);
    this.loading = true;

    this.chatService.getAllMessages().subscribe(
      (response: any) => {
        if (response.success && response.data) {
          const relevantMessages = response.data.filter(
            (m: any) => m.receiverId === this.loggedInSpecialist
          );

          const uniqueChatsMap = new Map();
          for (const msg of relevantMessages) {
            if (!uniqueChatsMap.has(msg.senderId)) {
              uniqueChatsMap.set(msg.senderId, msg);
            }
          }

          this.messages = Array.from(uniqueChatsMap.values());
          console.log('Unique chat entries:', this.messages);
        } else {
          this.errorMessage = 'Failed to load messages, no data found';
        }
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching messages: ' + error.message;
        this.loading = false;
      }
    );
  }

  openChat(senderId: string): void {
    this.router.navigate(['/chat', senderId]);
  }
  transform(email: string): string {
    return email ? email.split('@')[0] : '';
  }

}
