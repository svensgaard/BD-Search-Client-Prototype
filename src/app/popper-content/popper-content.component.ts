import { BDDocument } from './../Classes/bddocument';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popper-content',
  templateUrl: './popper-content.component.html',
  styleUrls: ['./popper-content.component.css']
})
export class PopperContentComponent implements OnInit {
  
  private _doc: BDDocument;
  private netBankIconUrl = '/assets/netbank.png';
  private notNetBankIconUrl = '/assets/not_netbank.png';  
  private kundeLaestIconUrl = '/assets/read.png';
  private kundeIkkeLaestIconUrl = '/assets/not_read.png';
  private letterIconUrl = '/assets/letter.png';
  private eboksIconUrl = '/assets/eboks.png';

  private netBankIconDisplay = 'none';
  private notNetBankIconDisplay = 'none';
  private kundeLaestIconDisplay = 'none';
  private kundeIkkeLaestIconDisplay = 'none';
  private letterIconDisplay = 'none';
  private eboksIconDisplay = 'none';
  
  

  

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set doc(document: BDDocument) {
    this._doc = document;
    //Netbank
    if(this._doc.synligNetbank === 'J') {
      this.netBankIconDisplay = 'inline';
      this.notNetBankIconDisplay = 'none';     
    } else {
      this.notNetBankIconDisplay = 'inline';
      this.netBankIconDisplay = 'none';
    }
    
  }

  get doc(): BDDocument {
    return this._doc;
  }

}
