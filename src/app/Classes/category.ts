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
    docToAdd['checked'] = false;
    this.documents.push(docToAdd);
  }

  compare(a: BDDocument, b: BDDocument) {
    if (new Date(a.udskriftsDato).getTime() < new Date(b.udskriftsDato).getTime()) {
      return -1;      
    }
    if (new Date(a.udskriftsDato).getTime() > new Date(b.udskriftsDato).getTime()) {
      return 1;      
    }
    return 0;
  }

  sort() {
    this.documents.sort(this.compare);
  }
}