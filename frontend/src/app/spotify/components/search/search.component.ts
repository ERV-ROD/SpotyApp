import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input()
  public placehoder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  emitValue(value: string): void{
    this.onValue.emit(value);
  }
}
