import { BDDokType } from './BDDokType';
import { BDDocument } from './bddocument';
import { Category } from './category';


export class Filter {

  static monthNames: string[] = ['Januar', 'Feburar', 'Marts', 'April', 'Maj', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'December'
  ];

  selectedSortOption = 'Dokumenttype (Faldende)';

  categories: Category[];

  dokTyper: BDDokType[];

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor() {
    this.dropdownList = [
      { 'id': 1, 'itemName': 'Kun synlige i Netbank' },
      { 'id': 2, 'itemName': 'Medtag fejlbehæftede' },
      { 'id': 3, 'itemName': 'Medtag autogenererede' }
    ];

    this.selectedItems = [
      { 'id': 3, 'itemName': 'Medtag autogenererede' }
    ];

    this.dropdownSettings = {
      text: 'Vælg filtre',
      selectAllText: 'Vælg Alle',
      unSelectAllText: 'Fravælg Alle',
      classes: 'filterSelect custom-class',
      badgeShowLimit: 1
    };

  }

  getFilteredDocs(docs: BDDocument[]): Category[] {
    
        this.categories = new Array<Category>();
    
        for (let doc of docs) {
          if (this.checkNetBank(doc) && this.checkFaulty(doc) && this.checkAutoGen(doc)) {
            if (this.selectedSortOption === 'Dokumenttype (nyeste først)') {
              this.addToCategories(doc.dokType, doc);
            } else if (this.selectedSortOption === 'Dato') {
              this.addToCategories(Filter.monthNames[new Date(doc.udskriftsDato).getMonth()], doc);
            } else if (this.selectedSortOption === 'Netbox') {
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
        if(this.checkSelectedItem(3) || this.dokTyper == null) {
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
    
        if (this.checkSelectedItem(1) && doc.synligNetbank === 'N') {
          return false;
        }
    
        return true;
      }
    
      checkFaulty(doc: BDDocument): boolean {
        if (doc === null) {return false;}
    
        if (!this.checkSelectedItem(2) && doc.fejlMarkeret === 'J') {
          return false;
        }
    
        return true;
      }

      checkSelectedItem(id: number): boolean {
        for(let selectedItem of this.selectedItems) {
          if(selectedItem['id'] === id) {
            return true;
          }
        }
        return false;
      }


}