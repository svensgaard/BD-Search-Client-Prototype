import { BDDokType } from './BDDokType';
import { BDDocument } from './bddocument';
import { Category } from './category';
import { ResultWrapper, SortBy, SortType } from './resultWrapper';


export class Filter {

  static monthNames: string[] = ['Januar', 'Feburar', 'Marts', 'April', 'Maj', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'December'
  ];

  selectedSortOption = 'Dokumenttype (A til Å)';

  dokTyper: BDDokType[];

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor() {
    this.dropdownList = [
      { 'id': 1, 'itemName': 'Synlig i Netbank', image: '../assets/netbank.png', category: 'et' },
      { 'id': 2, 'itemName': 'Kunden har læst dokumentet', image: '../assets/read.png', category: 'et' },
      { 'id': 3, 'itemName': 'Dokumentet er underskrevet', image: '../assets/signed.png', category: 'et' },
      { 'id': 4, 'itemName': 'Sendt til E-boks', image: '../assets/eboks.png', category: 'et' },
      { 'id': 5, 'itemName': 'Sendt som brev', image: '../assets/letter.png', category: 'et' },
      { 'id': 6, 'itemName': 'Medtag fejlbehæftede', image: null, category: 'to' },
      { 'id': 7, 'itemName': 'Medtag autogenererede', image: null, category: 'to' },
    ];

    this.selectedItems = [
      { 'id': 7, 'itemName': 'Medtag autogenererede' }
    ];

    this.dropdownSettings = {
      text: 'Vælg filtre',
      selectAllText: 'Vælg Alle',
      unSelectAllText: 'Fravælg Alle',
      classes: 'filterSelect custom-class',
      badgeShowLimit: 1,
      //groupBy: 'category'
    };

  }

  getFilteredDocs(docs: BDDocument[]): ResultWrapper {
    let wrapper = new ResultWrapper();
    let categories = new Array<Category>();
    for (let doc of docs) {
      if (this.checkNetBank(doc) && this.checkFaulty(doc) && this.checkAutoGen(doc)) {
        if (this.selectedSortOption === 'Dokumenttype (Å til A)') {
          this.addToCategories(doc.dokType, doc, categories);
          wrapper.sortBy = SortBy.DokType;
          wrapper.sortType = SortType.Faldende;
        } else if (this.selectedSortOption === 'Dokumenttype (A til Å)') {
          this.addToCategories(doc.dokType, doc, categories);
          wrapper.sortBy = SortBy.DokType;
          wrapper.sortType = SortType.Stigende;         
        } else if (this.selectedSortOption === 'Måned (Nyeste først)') {
          this.addToCategories(this.getCategoryDateName(doc.udskriftsDato), doc, categories);
          wrapper.sortBy = SortBy.Dato;
          wrapper.sortType = SortType.Stigende;          
        } else if (this.selectedSortOption === 'Måned (Ældste først)') {
          this.addToCategories(this.getCategoryDateName(doc.udskriftsDato), doc, categories);
          wrapper.sortBy = SortBy.Dato;
          wrapper.sortType = SortType.Faldende;         
        }

      }
    }
    wrapper.categories = categories;
    return wrapper;
  }

  getCategoryDateName(date: any) {
    return new Date(date).getFullYear() + ' - ' +Filter.monthNames[new Date(date).getMonth()];
  }

  addToCategories(categoryName: string, doc: BDDocument, categories: Category[]) {
    let exists: boolean;
    exists = false;

    for (let cat of categories) {
      if (cat.name === categoryName) {
        cat.addDocument(doc);
        exists = true;
      }
    }
    if (!exists) {
      let newCat = new Category(categoryName);
      newCat.addDocument(doc);

      categories.push(newCat);
    }

  }

  checkAutoGen(doc: BDDocument): boolean {
    if (this.checkSelectedItem(3) || this.dokTyper == null) {
      return true;
    } else {

      for (let dt of this.dokTyper) {
        if (doc.dokType === dt.dokType && dt.autoGen === '0') {
          return true;
        }
      }
      return false;
    }
  }

  checkNetBank(doc: BDDocument): boolean {
    if (doc === null) { return false; }

    if (this.checkSelectedItem(1) && doc.synligNetbank === 'N') {
      return false;
    }

    return true;
  }

  checkFaulty(doc: BDDocument): boolean {
    if (doc === null) { return false; }

    if (!this.checkSelectedItem(2) && doc.fejlMarkeret === 'J') {
      return false;
    }

    return true;
  }

  checkSelectedItem(id: number): boolean {
    for (let selectedItem of this.selectedItems) {
      if (selectedItem['id'] === id) {
        return true;
      }
    }
    return false;
  }


}
