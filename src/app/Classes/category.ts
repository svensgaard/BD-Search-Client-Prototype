import {BDDocument} from './bddocument';

export class Category {
  name: string;
  private _numberOfDocuments: number;
  documents: BDDocument[];
  sortBy: string;
  sortType: string;

  constructor(name: string) {
    this.name = name;
    this.documents = new Array<BDDocument>();
  }
  
  get numberOfDocuments(): number {return this.documents.length; }

  addDocument(docToAdd: BDDocument) {
    this.documents.push(docToAdd);
  }

  compareTo(other: Category) {
    if(other === null || other === undefined) { return 1; }

    
  }
  
}