import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {API_BASE_URL} from '../../app.tokens';

export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  categories: string[];
}

export interface ProductSearchParams {
  [key: string]: any; // To make compatible with HttpParams type
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}

export abstract class ProductService {
  abstract getAll(): Observable<Product[]>;
  abstract getById(productId: number): Observable<Product>;
  abstract getByCategory(category: string): Observable<Product[]>;
  abstract getAllCategories(): Observable<string[]>;
  abstract search(params: ProductSearchParams): Observable<Product[]>;
}

@Injectable()
export class HttpProductService implements ProductService {
  constructor(@Inject(API_BASE_URL) private baseUrl: string, private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`);
  }

  getById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/api/products/${productId}`);
  }

  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/categories/${category}`);
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/categories`);
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`, {  params });
  }

}

@Injectable()
export class _StaticProductService implements ProductService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json');
  }

  getById(productId: number): Observable<Product> {
    return this.http.get<Product[]>('/data/products.json').pipe(
      map(products => products.find(p => p.id === productId)));
  }

  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json').pipe(
      map(products => products.filter(p => p.categories.includes(category))));
  }

  /**
   *  Return distinct category names
   *  First select all categories and then create a set with unique category names
   *  We use the lettable tap() operator to illustrate debugging of observable
   *
   *  See https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md
   */
  getAllCategories(): Observable<string[]> {
    return this.http.get<Product[]>('/data/products.json')
      .pipe(
        tap(value => console.log('Before reducing categories', JSON.stringify(value[0].categories))),
        map(this.reduceCategories),
        tap(value => console.log(`After reducing categories ${value}`)),
        map(categories => Array.from(new Set(categories))),
        tap(value => console.log(`After creating categories array ${value}`))
      );
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json').pipe(
      map(products => this.filterProducts(products, params))
    );
  }

  // Populate an array with categories values of each product
  private reduceCategories(products: Product[]): string[] {
    return products.reduce((all, product) => all.concat(product.categories), new Array<string>());
  }

  // Keep only those product that meet the criteria from search params
  private filterProducts(products: Product[], params: ProductSearchParams): Product[] {
    return products
      .filter(p => params.title ? p.title.toLowerCase().includes((params.title as string).toLowerCase()) : products)
      .filter(p => params.minPrice ? p.price >= params.minPrice : products)
      .filter(p => params.maxPrice ? p.price <= params.maxPrice : products);
  }
}
