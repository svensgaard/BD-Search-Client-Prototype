import {BDDocument} from './bddocument';
import {Category} from './category';

enum DividedByEnum {
  Category,
  Months,
  Netbox
}
enum SortByEnum {
  rising,
  falling,
}

export class Filter {

  dividedBy: DividedByEnum;
  sortBy: SortByEnum;

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