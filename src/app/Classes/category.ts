import {BDDocument} from './bddocument';

export class Category {
  name: string;
  private _numberofdocuments: number;
  documents: BDDocument[];

  constructor(name: string) {
    this.name = name;
    this.documents = new Array<BDDocument>();
  }
  
  set numberofdocuments(numberofdocuments: number) {this._numberofdocuments = numberofdocuments; }
  get numberofdocuments(): number {return this.documents.length; }

  addDocument(docToAdd: BDDocument) {
    this.documents.push(docToAdd);
  }
  
}