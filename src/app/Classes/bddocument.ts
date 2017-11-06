export class BDDocument {
  uploadedDate: Date;
  documentType: string;
  detail: string;
  visibleInNetBox: boolean;
  markedAsFaulty: boolean;
  
  constructor(uploadedDate: Date, docType: string, detail: string, visibleInNetBox: boolean) {
    this.uploadedDate = uploadedDate;
    this.documentType = docType;
    this.detail = detail;
    this.visibleInNetBox = visibleInNetBox;
    this.markedAsFaulty = false;
  }
  
}