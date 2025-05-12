import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usernameExtract',
  standalone: true
})
export class UsernameExtractPipe implements PipeTransform {
  transform(email: string): string {
    return email ? email.split('@')[0] : '';
  }
}
