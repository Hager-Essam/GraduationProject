import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() {
  }

  private currentId: string = '';
  private currentImageUrl: string | ArrayBuffer | null = null;

  setImageId(id: string) {
    this.currentId = id;
  }

  getImageId() {
    return this.currentId;
  }

  setImageUrl(url: string | ArrayBuffer | null) {
    this.currentImageUrl = url;
  }

  getImageUrl() {
    return this.currentImageUrl;
  }

}
