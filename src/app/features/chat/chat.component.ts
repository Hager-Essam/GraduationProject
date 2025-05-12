import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChatService} from '../../core/services/chat/chat.service';
import {FormsModule} from '@angular/forms';
import {DatePipe, formatDate, NgClass, NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/services/Auth/auth.service';
import {Subscription} from 'rxjs';
import {SharedService} from '../../core/services/shared.service';

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
  role: null | string = '';
  specId: number | null = null;
  // loggedInIntId: number = 0;
  senderId: number = 0;
  specialistId: number | null = null;



  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private http: HttpClient,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
  }

  ngOnInit(): void {

    this.sharedService.currentSpecId$.subscribe(id => {
      this.specialistId = id;
      console.log('Received specialist ID from shared service:', this.specialistId);
    });

    this.receiverId = this.route.snapshot.paramMap.get('receiverId') || '';
    this.loggedInUserId = localStorage.getItem('userId') || '';
    console.log(`This is the receiver Id ${this.receiverId}`);
    console.log(`This is the sender Id ${this.loggedInUserId}`);
    this.role = this.authService.getUserRole();
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


  rateSpecialist() {
    if (this.ratingValue === 0) {
      alert('Please select a rating.');
      return;
    }


    const ratingData = {
      patientId: this.authService.getUserIntId(),
      specialistId: this.specialistId,
      ratingValue: Number(this.ratingValue),
      comment: this.comment,
      ratedAt: new Date().toISOString()
    };
    console.log(`On rating section Patient Id is ${ratingData.patientId}  and Spec Id id ${ratingData.specialistId}`);
    console.log('Submitting ratingData:', ratingData);

    this.http.post('https://bones.runasp.net/api/Rating/RateSpecialist', ratingData).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert('Rating submitted successfully!');
          this.comment = '';
          this.ratingValue = 0;
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
