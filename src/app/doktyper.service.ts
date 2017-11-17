import { BDDokType } from './Classes/BDDokType';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DoktyperService {

  private documentsUrl = '/server/';
  //private documentsUrl = '/Webprojects/Bankdata/BD-Search-Client-Prototype/server/';
  //private documentsUrl= 'http://localhost:8080/';

    constructor(
      private http: HttpClient
    ) {}

    getDocumentTypes(): Observable<BDDokType[]> {
      let realUrl = this.documentsUrl + 'dokTyper.php';
      console.log(realUrl);
      return this.http.get<BDDokType[]>(realUrl);
     }

}
