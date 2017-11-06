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
  root = 'http://localhost:8080/api.php?id=10';
  filter: Filter;

  private _filteredResults: Category[];

  constructor(private http: HttpClient) {
    this.filter = new Filter();
  }

  ngOnInit(): void {
    //    // Make the HTTP request: 
    //    console.log('Starting http request');
    //    this.http.get(this.root).subscribe(
    //
    //      data => {
    //        // Read the result field from the JSON response.
    //        this.results = data['data'];
    //        console.log(data['data']);
    //      },
    //
    //      err => {
    //        console.log('Something went wrong');
    //      }
    //    );
  }

  onSearched(searchResult: BDDocument[]) {
    this.results = searchResult;
    this._filteredResults = this.filter.getFilteredDocs(this.results);
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
