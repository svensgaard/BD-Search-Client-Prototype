import { Filter } from './../Classes/filter';
import { BDDokType } from './../Classes/BDDokType';
import {Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation} from '@angular/core';
import {Category} from '../Classes/category';
import {BDDocument} from '../Classes/bddocument';
import {DocumentService} from '../document.service';
import { DoktyperService } from '../doktyper.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  @Input() numOfResults: number;
  @Input() refnummer: string;
  @Output() onSearched = new EventEmitter<BDDocument[]>();
  @Output() onDokTypes = new EventEmitter<BDDokType[]>();
  @Output() filterChange = new EventEmitter<Filter>();
  @Input() filter: Filter;

  private _results: BDDocument[];
  private _dokTypes: BDDokType[];

  displayAdvanced = 'none';

  searchString: string;
  sourceArray: string[];

  dateFrom = this.oneYearAgo;
  dateTo = new Date();

  get oneYearAgo(): Date {
    let oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return oneYearAgo;
  }

  //Filter Dropdown
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(
    private documentService: DocumentService,
    private documentTypeService: DoktyperService
  ) {
    this.dropdownList = [
<<<<<<< HEAD
      { 'id': 1, 'itemName': 'India' },
      { 'id': 2, 'itemName': 'Singapore' },
      { 'id': 3, 'itemName': 'Australia' },
      { 'id': 4, 'itemName': 'Canada' },
      { 'id': 5, 'itemName': 'South Korea' },
      { 'id': 6, 'itemName': 'Brazil' }
    ];

    this.selectedItems = [
      { 'id': 1, 'itemName': 'India' },
      { 'id': 2, 'itemName': 'Singapore' },
      { 'id': 3, 'itemName': 'Australia' },
      { 'id': 4, 'itemName': 'Canada' }];
=======
      { "id": 1, "itemName": "Kun synlige i Netbank" },
      { "id": 2, "itemName": "Medtag fejlbehæftede" },
      { "id": 3, "itemName": "Medtag autogenererede" }
    ];

    this.selectedItems = [
      { "id": 3, "itemName": "Medtag autogenererede" }
    ];
>>>>>>> 80dcb0f9d5b594a193eff64f2318b6c150a414df

    this.dropdownSettings = {
      text: 'Vælg filtre',
      selectAllText: 'Vælg Alle',
      unSelectAllText: 'Fravælg Alle',
      classes: 'filterSelect custom-class',
      badgeShowLimit: 1
    };
  }

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
    this.documentService.getDocuments(this.refnummer, this.searchString, this.dateFrom, this.dateTo)
      .subscribe(docs => this.result = docs);
  }

  toogleAdvanced() {
    if(this.displayAdvanced === 'none') {
      this.displayAdvanced = 'inline';
    } else {
      this.displayAdvanced = 'none';
    }
  }


  //Filter methods
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}
