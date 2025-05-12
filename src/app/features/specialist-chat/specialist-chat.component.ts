import {Component} from '@angular/core';
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import {ChatService} from '../../core/services/chat/chat.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-specialist-chat',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './specialist-chat.component.html',
  styleUrl: './specialist-chat.component.scss'
})
export class SpecialistChatComponent {
  receiverId: string = '';
  messages: any[] = [];
  messageContent: string = '';
  loggedInUserId: string = '';
  ratingValue: number = 0;
  comment: string = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.receiverId = this.route.snapshot.paramMap.get('receiverId') || '';
    this.loggedInUserId = localStorage.getItem('userId') || '';
    console.log(`This is the receiver Id ${this.receiverId}`);
    console.log(`This is the sender Id ${this.loggedInUserId}`);

    if (this.receiverId) {
      this.getChat();
    } else {
      console.error('Receiver ID not found in route');
    }
  }

  getChat() {
    this.chatService.getChat(this.receiverId).subscribe({
      next: res => {
        this.messages = res.data || [];
      },
      error: err => {
        console.error('Error loading chat', err);
      }
    });
  }

  sendMessage() {
    if (!this.messageContent.trim()) return;

    this.chatService.sendMessage(this.receiverId, this.messageContent).subscribe({
      next: () => {
        this.messages.push({
          content: this.messageContent,
          sentAt: new Date().toISOString(),
          senderId: this.loggedInUserId
        });
        this.messageContent = '';
      },
      error: err => {
        console.error('Failed to send message', err);
      }
    });
  }
}
