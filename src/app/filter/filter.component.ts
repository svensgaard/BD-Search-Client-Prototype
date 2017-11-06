import {Filter} from '../Classes/filter';
import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() onFilter = new EventEmitter<Filter>();

  filter: Filter;
  private _selectedDividedBy: string;
  
  constructor() {
    this.filter = new Filter();
    this.filter.dividedBy = 'Dokument type';
    this.filter.sortBy = 'Faldende';
    this.filter.dateFrom = new Date();
    this.filter.dateTo = new Date();
    this.filter.showOnlyVisibleInNetBank = false;
    this.filter.showFaultyDocuments = false;
  }

  ngOnInit() {
  }

  onFilterChanged() {
    this.onFilter.emit(this.filter);
  }
}
