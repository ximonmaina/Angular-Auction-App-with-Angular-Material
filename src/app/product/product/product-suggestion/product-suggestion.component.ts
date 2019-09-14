import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../shared/services';
import {Observable} from 'rxjs';
import {MediaObserver} from '@angular/flex-layout';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'nga-product-suggestion',
  templateUrl: './product-suggestion.component.html',
  styleUrls: ['./product-suggestion.component.scss']
})
export class ProductSuggestionComponent implements OnInit {

   _filteredProducts: Product[];
  getProductId: number;
  @Input() set productId(value: number) {
    this.getProductId = value;
  }



  @Input() set products(value: Product[]) {
    this._filteredProducts = value;
  }

  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 2],
    ['sm', 3],
    ['md', 5],
    ['lg', 2],
    ['xl', 3],
  ]);

  constructor(private media: MediaObserver) {
    this.columns$ = this.media.media$
      .pipe(
        map(mc => this.breakpointsToColumnsNumber.get(mc.mqAlias)),
        startWith(3)
      );
  }

  ngOnInit() {
  }

  getFilteredProducts(): Product[] {
    const prodId = this.getProductId;
    let prods = [];
    prods = this._filteredProducts.filter((item) =>  {
      return item.id !== prodId;
    });
    return prods;
  }

}
