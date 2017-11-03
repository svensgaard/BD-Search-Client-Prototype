export class BDDocument {
  date: Date;
  documentType: string;
  detail: string;
  
  constructor(date: Date, docType: string, detail: string) {
    this.date = date;
    this.documentType = docType;
    this.detail = detail;
  }
  
  
}