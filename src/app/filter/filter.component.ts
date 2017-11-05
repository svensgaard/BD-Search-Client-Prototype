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

  constructor() {
    this.filter = new Filter();
  }

  ngOnInit() {
  }

  onFilterChanged() {
    
  }

}
