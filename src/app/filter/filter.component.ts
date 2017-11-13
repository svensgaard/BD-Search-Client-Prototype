import {Filter} from '../Classes/filter';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() filterChange = new EventEmitter<Filter>();
  @Input() filter: Filter;

  private _selectedDividedBy: string;

  constructor() {
  }

  ngOnInit() {

  }

  onFilterChanged() {
    console.log('filter changed');
    this.filterChange.emit(this.filter);
  }
}
