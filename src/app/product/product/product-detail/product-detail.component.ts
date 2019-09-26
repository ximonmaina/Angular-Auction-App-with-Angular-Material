import {ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {Product} from '../../../shared/services';
import {combineLatest, Observable, Subject} from 'rxjs';
import {API_BASE_URL} from '../../../app.tokens';
import {BidMessage, BidService} from '../../../shared/services/bid.service';
import {startWith} from 'rxjs/operators';

@Component({
  selector: 'nga-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit, OnChanges {
  private readonly productChanges$ = new Subject<Product>();
  latestBids$: Observable<number>;
  @Input() product: Product;

  constructor(@Inject(API_BASE_URL) private readonly baseUrl: string,
              private readonly bidService: BidService) { }

  ngOnInit() {
    this.latestBids$ = combineLatest(
      this.productChanges$.pipe(startWith(this.product)),
      this.bidService.priceUpdates$.pipe(startWith<BidMessage|null>(null)),
      (product, bid) => bid && bid.productId === product.id ? bid.price : product.price
    );
  }

  ngOnChanges({product}: {product: SimpleChange}) {
    this.productChanges$.next(product.currentValue);
  }

  placeBid(price: number) {
    this.bidService.placeBid(this.product.id, price);
  }

  urlFor(product: Product): string {
    return `${this.baseUrl}/${product.imageUrl}`;
  }

}
