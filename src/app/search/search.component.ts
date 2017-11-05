import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Category} from '../Classes/category';
import {BDDocument} from '../Classes/bddocument';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() onSearched = new EventEmitter<BDDocument[]>();

  constructor() {}

  ngOnInit() {
    this.search();
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.search();
    }
  }

  search() {
    let result = new Array<BDDocument>();
    // Do the search
    result.push(new BDDocument(new Date(), 'Kontoudtog', 'detaljer'));
    result.push(new BDDocument(new Date(), 'Kontoudtog', 'detaljer'));
    result.push(new BDDocument(new Date(), 'Kontoudtog', 'detaljer'));

    //Emit result
    this.onSearched.emit(result);
  }


}
