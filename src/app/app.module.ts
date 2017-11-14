import { DoktyperService } from './doktyper.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {NgxPopperModule} from 'ngx-popper';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';

import { DocumentsComponent } from './documents/documents.component';
import { FilterComponent } from './filter/filter.component';
import { SearchComponent } from './search/search.component';
import { CategoryComponent } from './category/category.component';
import { DocumentService } from './document.service';
import { PopperContentComponent } from './popper-content/popper-content.component';


@NgModule({
  declarations: [
    AppComponent,
    DocumentsComponent,
    FilterComponent,
    SearchComponent,
    CategoryComponent,
    PopperContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Ng2AutoCompleteModule,
    NgxPopperModule
  ],
  providers: [DocumentService, DoktyperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
