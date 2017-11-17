import { RootComponent } from './real.root.component';
import { DoktyperService } from './doktyper.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {NgxPopperModule} from 'ngx-popper';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { DocumentsComponent } from './documents/documents.component';
import { FilterComponent } from './filter/filter.component';
import { SearchComponent } from './search/search.component';
import { CategoryComponent } from './category/category.component';
import { DocumentService } from './document.service';
import { PopperContentComponent } from './popper-content/popper-content.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    DocumentsComponent,
    FilterComponent,
    SearchComponent,
    CategoryComponent,
    PopperContentComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Ng2AutoCompleteModule,
    NgxPopperModule,
    AppRoutingModule,
    AngularMultiSelectModule
  ],
  providers: [DocumentService, DoktyperService],
  bootstrap: [RootComponent]
})
export class AppModule { }
