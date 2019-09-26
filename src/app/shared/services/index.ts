import {HttpProductService, Product, ProductService} from './product.service';
import {Provider} from '@angular/core';
import {BidService} from './bid.service';
import {WebsocketService} from './websocket.service';

export {Product, ProductService} from './product.service';

export const  SHARED_SERVICES: Provider[] = [
  {provide: BidService, useClass: BidService},
  {provide: ProductService, useClass: HttpProductService},
  {provide: WebsocketService, useClass: WebsocketService}
];
