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
  signedIconUrl = '/assets/signed.png';
  signedElectronicallyIconUrl = '/assets/signed_electronic.png';

  netBankIconDisplay = 'none';
  notNetBankIconDisplay = 'none';
  kundeLaestIconDisplay = 'none';
  kundeIkkeLaestIconDisplay = 'none';
  letterIconDisplay = 'none';
  eboksIconDisplay = 'none';
  signedIconDisplay = 'none';
  signedElectronicallyIconDisplay = 'none';

constructor() { }

  ngOnInit() {
  }

  @Input()
  set doc(document: BDDocument) {
    this._doc = document;

    //Netbank
    if(this._doc.synligNetbank === 'J') {
      this.netBankIconDisplay = 'table-row';
      this.notNetBankIconDisplay = 'none';
    } else {
      this.notNetBankIconDisplay = 'table-row';
      this.netBankIconDisplay = 'none';
    }

    //Læst
    if(this._doc.kundeLaest === 'J') {
      this.kundeLaestIconDisplay = 'table-row';
      this.kundeIkkeLaestIconDisplay = 'none';
    } else {
      this.kundeLaestIconDisplay = 'none';
      this.kundeIkkeLaestIconDisplay = 'table-row';
    }

    //Fysisk
    if(this._doc.forsendelsesKode.includes('K')) {
      this.letterIconDisplay = 'table-row';     
    } else {
      this.letterIconDisplay = 'none';
    }

    //eboks
    if(this._doc.forsendelsesKode.includes('E')) {
      this.eboksIconDisplay = 'table-row';
    } else {
      this.eboksIconDisplay = 'none';      
    }

    //signed
    if(this._doc.e_underskrevet === 'J' ) {
      this.signedElectronicallyIconDisplay = 'table-row';
    } else {
      this.signedElectronicallyIconDisplay = 'none';
    }

  }

  get doc(): BDDocument {
    return this._doc;
  }

}
