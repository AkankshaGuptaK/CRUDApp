import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { CRUDdatatableComponent } from './cruddatatable/cruddatatable.component';
import { DataAddEditComponent } from './cruddatatable/data-add-edit/data-add-edit.component';
import { TableComponent } from './cruddatatable/table/table.component';
import { ItemData } from './cruddatatable/shared/fake-api/item-data.service';
import { ShortNumberPipe } from './cruddatatable/shared/short-number.pipe';
import { EditGuard } from './cruddatatable/shared/editGuard.service';

const appRoutes: Routes=[
  {path:'add',component:DataAddEditComponent,canActivate:[EditGuard]},
  {path:'edit/:id',component:DataAddEditComponent,canActivate:[EditGuard]},
  {path:'',component:TableComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CRUDdatatableComponent,
    DataAddEditComponent,
    TableComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes ),
    ReactiveFormsModule,    
    DataTablesModule,
    InMemoryWebApiModule.forRoot(ItemData),
  ],
  providers: [ShortNumberPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
