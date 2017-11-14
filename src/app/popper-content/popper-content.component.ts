import { BDDocument } from './../Classes/bddocument';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popper-content',
  templateUrl: './popper-content.component.html',
  styleUrls: ['./popper-content.component.css']
})
export class PopperContentComponent implements OnInit {

  private _doc: BDDocument;
  netBankIconUrl = '/assets/netbank.png';
  notNetBankIconUrl = '/assets/not_netbank.png';
  kundeLaestIconUrl = '/assets/read.png';
  kundeIkkeLaestIconUrl = '/assets/not_read.png';
  letterIconUrl = '/assets/letter.png';
  eboksIconUrl = '/assets/eboks.png';

  netBankIconDisplay = 'none';
  notNetBankIconDisplay = 'none';
  kundeLaestIconDisplay = 'none';
  kundeIkkeLaestIconDisplay = 'none';
  letterIconDisplay = 'none';
  eboksIconDisplay = 'none';





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
