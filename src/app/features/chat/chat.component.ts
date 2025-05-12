import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef, ChangeDetectorRef, AfterViewChecked
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChatService} from '../../core/services/chat/chat.service';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/services/Auth/auth.service';
import {SharedService} from '../../core/services/shared.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: true,
  imports: [FormsModule, NgClass, NgForOf, DatePipe, NgIf],
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit,AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  receiverId: string = '';
  messages: any[] = [];
  messageContent: string = '';
  loggedInUserId: string = '';
  ratingValue: number = 0;
  comment: string = '';
  role: null | string = '';
  specialistId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private http: HttpClient,
    private authService: AuthService,
    private sharedService: SharedService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.sharedService.currentSpecId$.subscribe(id => {
      this.specialistId = id;
    });

    this.receiverId = this.route.snapshot.paramMap.get('receiverId') || '';
    this.loggedInUserId = localStorage.getItem('userId') || '';
    this.role = this.authService.getUserRole();

    if (this.receiverId) {
      this.getChat();
    } else {
      console.error('Receiver ID not found in route');
    }
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }


  getChat() {
    this.chatService.getChat(this.receiverId).subscribe({
      next: res => {
        this.messages = res.data || [];
        this.scrollToBottom();
      },
      error: err => {
        console.error('Error loading chat', err);
      }
    });
  }

  sendMessage() {
    if (!this.messageContent.trim()) return;

    const newMessage = {
      content: this.messageContent,
      sentAt: new Date().toISOString(),
      senderId: this.loggedInUserId
    };

    this.chatService.sendMessage(this.receiverId, this.messageContent).subscribe({
      next: () => {
        this.messages.push(newMessage);
        this.messageContent = '';
        this.cdRef.detectChanges();
        this.scrollToBottom();
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

  trackByFn(index: number, msg: any): any {
    return msg.id || index;
  }

}
