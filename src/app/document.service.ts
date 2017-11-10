import {BDDocument} from './Classes/bddocument';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class DocumentService {

  private documentsUrl = 'http://localhost:8080/';

  constructor(
    private http: HttpClient
  ) {}

  getDocuments(id: string, searchTerm: string): Observable<BDDocument[]> {
    let realUrl = this.documentsUrl + 'api.php?id='+ id + '&searchTerm=' + encodeURIComponent(searchTerm);
    //realUrl = encodeURI(realUrl);
    console.log(realUrl);
    return this.http.get<BDDocument[]>(realUrl);
   }

}
