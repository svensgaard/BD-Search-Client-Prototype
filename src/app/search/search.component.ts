import { CheckedDocumentsService } from './../checked-documents.service';
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
  private _selectedAction: string;

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
    private _checkedDocsService: CheckedDocumentsService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {

    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.sourceArray = new Array();
    this.searchString = '';
    this._selectedAction = '';

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

  /*reset(formElem: Element){
    formElemnt.reset();
  }
  <button (click)="reset(#searchForm)">Nulstil</button>
  */

  toogleAdvanced() {
    if (this.displayAdvanced === 'none') {
      this.displayAdvanced = 'inline';
    } else {
      this.displayAdvanced = 'none';
    }
  }

  emitFilter() {
    this.filterChange.emit(this.filter);
  }

  onSortChanged(option) {
    this.filter.selectedSortOption = option;
    this.emitFilter();
  }

  get selectedAction(): string {
    return this._selectedAction;
  }

  set selectedAction(value: string) {
    this._selectedAction = '';
    if (this._checkedDocsService.checkedDocuments !== 0) {
      switch (value) {
        case 'addToAssignment':
          this.toastr.success(this._checkedDocsService.checkedDocuments + ' Dokumenter er tilføjet til opgaven', 'Tilføjet til opgave');
          break;
        case 'download':
          this.toastr.success(this._checkedDocsService.checkedDocuments + ' Dokumenter er downloadet', 'Download fil(er)');
          break;
        case 'print':
          this.toastr.success(this._checkedDocsService.checkedDocuments + ' Dokumenter bliver nu pakket til print', 'Sendt til print');
          break;
        case 'errorMark':
          this.toastr.success(this._checkedDocsService.checkedDocuments + ' Dokumenter sendes til fejlmarkering', 'Fejlmarkering');
          break;
        default:
          this.toastr.info('Du har ikke valgt nogen handling...', 'Ingen handling valgt');
      }
    } else {
      this.toastr.warning('Vælg et dokument til handling', 'Ingen dokumenter valgt');
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
