import {BDDocument} from './bddocument';
import {Category} from './category';


export class Filter {

  static monthNames: string[] = ['Janurar', 'Februrar', 'Marts', 'April', 'Maj', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'December'
  ];

  dividedBy: string;
  sortBy: string;

  dateTo: Date;
  dateFrom: Date;

  showOnlyVisibleInNetBank: boolean;
  showFaultyDocuments: boolean;

  categories: Category[];


  getFilteredDocs(docs: BDDocument[]): Category[] {

    this.categories = new Array<Category>();

    for (let doc of docs) {
      if (this.checkDate(doc) && this.checkNetBank(doc) && this.checkFaulty(doc)) {
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

  checkDate(doc: BDDocument): boolean {
    if (doc === null) {return false;}

    if (new Date(doc.udskriftsDato) >= new Date(this.dateFrom) && new Date(doc.udskriftsDato) <= new Date(this.dateTo)) {
      return true;
    }

    return false;
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
}