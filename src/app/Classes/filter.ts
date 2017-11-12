import { BDDokType } from './BDDokType';
import {BDDocument} from './bddocument';
import {Category} from './category';


export class Filter {

  static monthNames: string[] = ['Januar', 'Feburar', 'Marts', 'April', 'Maj', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'December'
  ];

  dividedBy: string;
  sortBy: string;

  showOnlyVisibleInNetBank: boolean;
  showFaultyDocuments: boolean;
  includeAutoGen: boolean;

  categories: Category[];

  dokTyper: BDDokType[];


  getFilteredDocs(docs: BDDocument[]): Category[] {

    this.categories = new Array<Category>();

    for (let doc of docs) {
      if (this.checkNetBank(doc) && this.checkFaulty(doc) && this.checkAutoGen(doc)) {
        if (this.dividedBy === 'Dokument type') {
          this.addToCategories(doc.dokType, doc);
        } else if (this.dividedBy === 'Dato') {
          this.addToCategories(Filter.monthNames[new Date(doc.udskriftsDato).getMonth()], doc);
        } else if (this.dividedBy === 'Netbox') {
          this.addToCategories(doc.dokType, doc);
        }

      }
    }

    return this.categories;
  }

  addToCategories(categoryName: string, doc: BDDocument) {
    let exists: boolean;
    exists = false;

    for (let cat of this.categories) {
      if (cat.name === categoryName) {
        cat.addDocument(doc);
        exists = true;
      }
    }
    if (!exists) {
      let newCat = new Category(categoryName);
      newCat.addDocument(doc);

      this.categories.push(newCat);
    }

  }

  checkAutoGen(doc: BDDocument): boolean {
    if(this.includeAutoGen || this.dokTyper == null) {
      return true;
    } else {

      for(let dt of this.dokTyper){
        if(doc.dokType === dt.dokType && dt.autoGen === '0') {
          return true;
        }
      }
      return false;
    }
  }

  checkNetBank(doc: BDDocument): boolean {
    if (doc === null) {return false;}

    if (this.showOnlyVisibleInNetBank && doc.synligNetbank === 'N') {
      return false;
    }

    return true;
  }

  checkFaulty(doc: BDDocument): boolean {
    if (doc === null) {return false;}

    if (!this.showFaultyDocuments && doc.fejlMarkeret === 'J') {
      return false;
    }

    return true;
  }

  toString(): string {
    let returString = 'Viser';

    if(this.showOnlyVisibleInNetBank) {
      returString += ' kun dokumenter synlige i netbank';
    } else {
      returString += ' alle';
    }
    if(this.showFaultyDocuments) {
      returString += ' med fejlbehæftede';
    }
    if(this.includeAutoGen) {
      if(this.showFaultyDocuments) {
        returString += ' og auto generede dokumenter inkluderet';
      } else {
        returString += ' med auto generede dokumenter';        
      }
    }

    returString += ' opdelt i ' + 
    this.dividedBy + 
    ' sorteret efter ' + 
    this.sortBy;
    

    return returString;
  }
}