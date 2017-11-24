import { Filter } from './../Classes/filter';
import { BDDokType } from './../Classes/BDDokType';
import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { Category } from '../Classes/category';
import { BDDocument } from '../Classes/bddocument';
import { DocumentService } from '../document.service';
import { DoktyperService } from '../doktyper.service';
import { ToastsManager } from 'ng2-toastr';



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

  constructor(
    private documentService: DocumentService,
    private documentTypeService: DoktyperService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {

    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.sourceArray = new Array();
    this.searchString = '';

    this.search();
    //Get dok types
    this.documentTypeService.getDocumentTypes()
      .subscribe(types => this.dokTypes = types);
  }

  onSearchPressed() {
    this.search();
    this.filter.selectedSortOption = 'Dokumenttype (A til Å)';
    this.filterChange.emit(this.filter);
  }

  set result(res: BDDocument[]) {
    this._results = res;
    //Filter date
    this.onSearched.emit(this._results);
  }

  set dokTypes(dokTypes: BDDokType[]) {
    this._dokTypes = dokTypes;

    for (let d of this._dokTypes) {
      this.sourceArray.push(d.dokType);
    }

    this.onDokTypes.emit(this._dokTypes);
  }


  search() {
    //Emit result
    this.documentService.getDocuments(this.refnummer, this.searchString, this.dateFrom, this.dateTo)
      .subscribe(docs => this.result = docs);
  }

  emitFilter() {
    this.filterChange.emit(this.filter);
  }

  onSortChanged(option) {
    this.filter.selectedSortOption = option;
    this.emitFilter();
  }

  onSelectAction(value): void {
    switch (value) {
      case 'addToAssignment':
        this.toastr.success('Dokument(erne) er tilføjet til opgaven', 'Tilføjet til opgave');
        break;
      case 'download':
        this.toastr.success('Dokument(erne) er downloadet', 'Download fil(er)');
        break;
      case 'print':
        this.toastr.success('Dokument(erne) bliver nu pakket til print', 'Sendt til print');
        break;
      case 'errorMark':
        this.toastr.success('Dokument(erne) sendes til fejlmarkering', 'Fejlmarkering');
        break;
      default:
        this.toastr.info('Du har ikke valgt nogen handling...', 'Ingen handling valgt');
    }
  }

  //Filter methods
  onItemSelect(item: any) {
    this.emitFilter();
  }
  OnItemDeSelect(item: any) {
    this.emitFilter();
  }
  onSelectAll(items: any) {
    this.emitFilter();
  }
  onDeSelectAll(items: any) {
    this.emitFilter();
  }
}
