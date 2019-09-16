import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../shared/services';
import {Observable} from 'rxjs';
import {MediaObserver} from '@angular/flex-layout';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'nga-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {
  @Input() products: Product[];
  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 1],
    ['sm', 2],
    ['md', 3],
    ['lg', 4],
    ['xl', 5]
  ]);

  constructor(private media: MediaObserver) {
    this.columns$ = this.media.media$.pipe(
      map(mc => this.breakpointsToColumnsNumber.get(mc.mqAlias) as number), startWith(3)
    );
  }

  ngOnInit() {
  }

}
