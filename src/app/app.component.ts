import { BDDokType } from './Classes/BDDokType';
import { BDDocument } from './Classes/bddocument';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './Classes/category';
import { Filter } from './Classes/filter';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  results: BDDocument[];
  private _filter: Filter;
  refnummer = '';
  private _filteredResults: Category[];
  displayError = 'none';
  sub: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this._filter = new Filter();
    this._filteredResults = null;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.refnummer = params['refnummer'];

      if(this.refnummer === null || this.refnummer === undefined) {this.refnummer = '2057642';}

      //First filter is everything and on dok type
      let firstFilter = new Filter();
      firstFilter.dividedBy = 'Dokument type';
      firstFilter.sortBy = 'Faldende';

      firstFilter.showOnlyVisibleInNetBank = false;
      firstFilter.showFaultyDocuments = true;
      firstFilter.includeAutoGen = true;

      this.filter = firstFilter;


    });

  }

  get filter(): Filter {
    return this._filter;
  }
  set filter(newFilter: Filter) {
    this._filter = newFilter;
    if (this.results != null) {
      this._filteredResults = this.filter.getFilteredDocs(this.results);
    }
  }

  onSearched(searchResult: BDDocument[]) {
    if (searchResult != null) {
      this.results = searchResult;
      this._filteredResults = this.filter.getFilteredDocs(this.results);
      this.displayError = 'none';
    } else {
      this.displayError = 'inline';
      this.results = null;
      this._filteredResults = null;
    }

  }

  onDokTypes(dokTypes: BDDokType[]) {
    this._filter.dokTyper = dokTypes;
  }

  get filteredResults(): Category[] {
    return this._filteredResults;
  }

  get numOfResults(): number {
    if (this._filteredResults !== undefined && this._filteredResults !== null) {
      let num = 0;
      for (let cat of this._filteredResults) {
        num += cat.documents.length;
      }
      return num;
    } else {
      return 0;
    }
  }

}
