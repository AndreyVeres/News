import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent {
  @Output() onChangeQuery = new EventEmitter<string>();
  setSearchQuery = (value: string) => this.onChangeQuery.emit(value)
}
