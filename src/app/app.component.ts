import {BDDocument} from './Classes/bddocument';
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from './Classes/category';
import {Filter} from './Classes/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  results: BDDocument[];
  filter: Filter;

  private _filteredResults: Category[];

  constructor(private http: HttpClient) {
    this.filter = new Filter();
  }

  ngOnInit(): void {
    //First filter is everything and on dok type
    let firstFilter = new Filter();
    firstFilter.dividedBy = 'Dokument type';
    firstFilter.sortBy = 'Faldende';
    
    //Date magic
    firstFilter.dateFrom = new Date(-8640000000000000);
    firstFilter.dateTo = new Date(8640000000000000);

    firstFilter.showOnlyVisibleInNetBank = false;
    firstFilter.showFaultyDocuments = false;
    
    this.onFilter(firstFilter);
  }

  onSearched(searchResult: BDDocument[]) {
    if (searchResult != null) {
      this.results = searchResult;
      this._filteredResults = this.filter.getFilteredDocs(this.results);
    } else {
      alert('Ingen resultater fundet.');
    }

  }

  onFilter(filter: Filter) {
    this.filter = filter;
    if (this.results != null) {
      this._filteredResults = this.filter.getFilteredDocs(this.results);
    }
  }

  get filteredResults(): Category[] {
    return this._filteredResults;
  }


}
