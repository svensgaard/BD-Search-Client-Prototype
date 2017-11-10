import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Category} from '../Classes/category';
import {BDDocument} from '../Classes/bddocument';
import {DocumentService} from '../document.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() onSearched = new EventEmitter<BDDocument[]>();

  private _results: BDDocument[];

  displayAdvanced = 'none';
  
  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.search('');
  }

  onKeyEnter(searchTerm: string) {
    this.search(searchTerm);
    console.log('searched with: ' + searchTerm);
  }

  onKeyInput(searchTerm: string) {
    console.log(searchTerm);
  }

  set result(res: BDDocument[]) {
    this._results = res;
    this.onSearched.emit(this._results);
  }

  search(searchTerm: string) {
    //Emit result
    this.documentService.getDocuments('2057386', searchTerm)
      .subscribe(docs => this.result = docs);
  }
  
  toogleAdvanced() {
    if(this.displayAdvanced === 'none') {
      this.displayAdvanced = 'inline';
    } else {
      this.displayAdvanced = 'none';
    }
  }

}
