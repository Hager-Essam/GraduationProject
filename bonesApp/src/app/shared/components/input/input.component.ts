import {Component, forwardRef, Input, Output,EventEmitter} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',

})
export class InputComponent {

  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
