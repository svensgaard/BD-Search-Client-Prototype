import { BDDokType } from './../Classes/BDDokType';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {Category} from '../Classes/category';
import {BDDocument} from '../Classes/bddocument';
import {DocumentService} from '../document.service';
import { DoktyperService } from '../doktyper.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() numOfResults: number;
  @Input() refnummer: string;
  @Output() onSearched = new EventEmitter<BDDocument[]>();
  @Output() onDokTypes = new EventEmitter<BDDokType[]>();

  private _results: BDDocument[];
  private _dokTypes: BDDokType[];
  
  displayAdvanced = 'none';
  
  searchString: string;
  sourceArray: string[];
  dateFrom: Date;
  dateTo: Date;

  constructor(
    private documentService: DocumentService,
    private documentTypeService: DoktyperService
  ) {}

  ngOnInit() {
    this.sourceArray = new Array();
    this.searchString = '';
    this.search();
    //Get dok types
    this.documentTypeService.getDocumentTypes()
    .subscribe(types => this.dokTypes = types);
  }

  onKeyEnter() {
    this.search();
    console.log('searched with: ' + this.searchString);
  }

  set result(res: BDDocument[]) {
    this._results = res;
    //Filter date
    this.onSearched.emit(this._results);
  }

  set dokTypes(dokTypes: BDDokType[]) {
    this._dokTypes = dokTypes;

    for(let d of this._dokTypes) {
      this.sourceArray.push(d.dokType);
    }

    this.onDokTypes.emit(this._dokTypes);
  }
  

  search() {
    //Emit result
    this.documentService.getDocuments(this.refnummer, this.searchString)
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
