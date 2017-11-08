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

  }

  ngOnInit() {
    this.filter = new Filter();
    this.filter.dividedBy = 'Dokument type';
    this.filter.sortBy = 'Faldende';
    
    //Date magic
    let now = new Date();
    let oneYearAgo = new Date();    
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    this.filter.dateFrom = oneYearAgo;
    this.filter.dateTo = now;

    this.filter.showOnlyVisibleInNetBank = false;
    this.filter.showFaultyDocuments = false;
    
    //Give filter to app component
    this.onFilterChanged();
  }

  onFilterChanged() {
    this.onFilter.emit(this.filter);
  }
}
