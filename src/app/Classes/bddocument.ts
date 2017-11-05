export class BDDocument {
  uploadedDate: Date;
  documentType: string;
  detail: string;
  
  constructor(uploadedDate: Date, docType: string, detail: string) {
    this.uploadedDate = uploadedDate;
    this.documentType = docType;
    this.detail = detail;
  }
  
}