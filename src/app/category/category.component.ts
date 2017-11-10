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

  onClickHeader() {
    if(this.display === 'none') {
      this.display = 'inline';
    } else {
      this.display = 'none';
    }
  }
}
