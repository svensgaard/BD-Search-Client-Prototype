import {BDDocument} from './bddocument';
import {Category} from './category';


export class Filter {

  dividedBy: string;
  sortBy: string;

  dateTo: Date;
  dateFrom: Date;

  showOnlyVisibleInNetBank: boolean;
  showFaultyDocuments: boolean;

  getFilteredDocs(docs: BDDocument[]): Category[] {

    let categories = new Array<Category>();
    categories.push(new Category('Kontoudskrifter'));
    categories.push(new Category('Deopt udtog'));
    categories[0].addDocument(docs[0]);
    categories[0].addDocument(docs[1]);
    categories[1].addDocument(docs[1]);

    return categories;
  }
}