import {BDDocument} from './bddocument';

export class Category {
  name: string;
  private _numberOfDocuments: number;
  documents: BDDocument[];

  constructor(name: string) {
    this.name = name;
    this.documents = new Array<BDDocument>();
  }
  
  get numberOfDocuments(): number {return this.documents.length; }

  addDocument(docToAdd: BDDocument) {
    this.documents.push(docToAdd);
  }
  
}