import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductSuggestionComponent } from './product/product-suggestion/product-suggestion.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatGridListModule} from '@angular/material';



@NgModule({
  declarations: [ProductComponent, ProductDetailComponent, ProductSuggestionComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {path: '', component: ProductComponent}
    ]),
    MatButtonModule,
    MatGridListModule
  ]
})
export class ProductModule { }
