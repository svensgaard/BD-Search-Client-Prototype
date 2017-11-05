import { Category } from '../Classes/category';
import { BDDocument } from '../Classes/bddocument';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  private _categories: Category[];
  
  constructor() { }

  get categories(): Category[] {
    return this._categories;
  }
  @Input()
  set categories(categories: Category[]) {
    this._categories = categories;
  }
  
  ngOnInit() {
  }

}
