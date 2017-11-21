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
  headerStatusIndicator = 'keyboard_arrow_down';

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
    let returnstring='';

    if(document.n1 !== '?') {returnstring+= document.n1 + ': ' + document.n1_value + '\t'; }
    if(document.n2 !== '?') {returnstring+= document.n2 + ': ' + document.n2_value + '\t'; }
    if(document.tekst !== '?') {returnstring+= document.tekst + ': ' + document.tekst_value;}

    return  returnstring;

  }
  onClickHeader() {
    if(this.display === 'none') {
      this.display = 'inline';
      this.headerStatusIndicator = 'keyboard_arrow_up';
    } else {
      this.display = 'none';
      this.headerStatusIndicator = 'keyboard_arrow_down';
    }
  }
}
