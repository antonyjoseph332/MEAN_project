import { Component, EventEmitter, Output } from '@angular/core';
import { AntDesignModule } from '../../modules/ant-design.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, AntDesignModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  @Output('action') action: EventEmitter<string> = new EventEmitter;

  inputValue: string = ''

  seachItem() {
    this.action.emit(this.inputValue);
  }

  reset() {
    this.inputValue = ''
  }
}
