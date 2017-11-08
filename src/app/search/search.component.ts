import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Category} from '../Classes/category';
import {BDDocument} from '../Classes/bddocument';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() onSearched = new EventEmitter<BDDocument[]>();

  private _results: BDDocument[];
  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.search();
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) { //Enter
      this.search();
    }
  }
  
  set result(res: BDDocument[]) {
    this._results = res;
    this.onSearched.emit(res);
  }

  search() {
    //Emit result
    this.documentService.getDocuments('2059083')
      .subscribe(docs => this.result = docs);
  }


}
