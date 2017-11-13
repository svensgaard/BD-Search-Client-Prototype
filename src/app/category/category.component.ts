import { BDDocument } from './../Classes/bddocument';
import {BDDocument} from '../Classes/bddocument';
import {Category} from '../Classes/category';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private _category: Category;

  display = 'none';
  headerStatusIndicator = '+';

  constructor() {
  }

  ngOnInit() {
  }

  @Input()
  set category(category: Category) {
    this._category = category;
  }
  get category(): Category {
    return this._category;
  }
  buildDetails(document: BDDocument) {
    return document.n1 + ' ' + document.n1_value + '\t' + document.n2 + document.n2_value + 
    '\t' + document.tekst + ' ' + document.tekst_value;
    
  }
  onClickHeader() {
    if(this.display === 'none') {
      this.display = 'inline';
      this.headerStatusIndicator = '-';
    } else {
      this.display = 'none';
      this.headerStatusIndicator = '+';
    }
  }
}
