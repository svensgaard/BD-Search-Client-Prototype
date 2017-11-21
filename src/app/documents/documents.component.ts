import { Category } from '../Classes/category';
import { BDDocument } from '../Classes/bddocument';
import { Component, OnInit, Input } from '@angular/core';
import { ResultWrapper } from '../Classes/resultWrapper';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  private _resultWrapper: ResultWrapper;
  
  constructor() { }

  get categories(): Category[] {
    if(this._resultWrapper !== null) {
      return this._resultWrapper.categories;
    } else {
      return null;
    }
    
  }
  @Input()
  set resultWrapper(resultWrapper: ResultWrapper) {
    this._resultWrapper = resultWrapper;
    if(this._resultWrapper !== null) {
      this._resultWrapper.sort();
    }
  }
  
  ngOnInit() {
  }

}
