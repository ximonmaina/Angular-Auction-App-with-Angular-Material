import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule, Routes} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatGridListModule, MatTabsModule} from '@angular/material';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { CategoriesComponent } from './categories/categories.component';
import { SearchResultsComponent } from './search-results/search-results.component';


const routes: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'categories'},
  {path: 'search-results', component: SearchResultsComponent},
  {path: 'categories',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'all'},
      {path: ':category', component: CategoriesComponent }
    ]}
];
@NgModule({
  declarations: [ ProductGridComponent, CategoriesComponent, SearchResultsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatGridListModule,
    MatTabsModule
  ]
})
export class HomeModule { }
