import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
export interface Message {
  senderId: string;
  receiverId: string;
  content: string;
  sentAt: string;
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://bones.runasp.net/api/Chat';

  constructor(private http: HttpClient) {
  }

  getChat(receiverId: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.apiUrl}/GetChat?ReceiverId=${receiverId}`, {headers});
  }

  sendMessage(receiverId: string, content: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });

    const messageDTO = {
      receiverId: receiverId,
      content: content,
      sentAt: new Date().toISOString()
    };

    return this.http.post(`${this.apiUrl}/SendMessage`, messageDTO, {headers});
  }

  private MessagesUrl = 'https://bones.runasp.net/api/Chat/GetAllMessages';


  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.MessagesUrl);
  }

}
