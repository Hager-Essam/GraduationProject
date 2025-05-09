import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../core/services/chat/chat.service';
import { FormsModule } from '@angular/forms';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
    DatePipe,
    NgIf
  ],
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
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
  ) {}

  ngOnInit(): void {
    this.receiverId = this.route.snapshot.paramMap.get('receiverId') || '';
    this.loggedInUserId = localStorage.getItem('userId') || '';

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
        // Add message to local array for real-time update
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

  rateSpecialist() {
    if (this.ratingValue === 0) {
      alert('Please select a rating.');
      return;
    }

    const ratingData = {
      patientId: this.loggedInUserId,
      specialistId: this.receiverId,
      ratingValue: this.ratingValue,
      comment: this.comment
    };

    this.http.post('https://bones.runasp.net/api/Rating/RateSpecialist', ratingData).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert('Rating submitted successfully!');
        } else {
          alert('Failed to submit rating.');
        }
      },
      error: err => {
        console.error('Error submitting rating:', err);
        alert('An error occurred while submitting the rating.');
      }
    });
  }
}
