import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { DocumentsComponent } from './documents/documents.component';
import { FilterComponent } from './filter/filter.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    DocumentsComponent,
    FilterComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
