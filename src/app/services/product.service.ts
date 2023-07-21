import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { Categories } from '../common/categories';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  // get products by category and pagination
  getProductListPagination(thePagesize:number,
                           thePageNumber:number,
                           categoryId:number): Observable<GetResponse> {
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${thePageNumber}&size=${thePagesize}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }

  //get all products
  getProductList(thePagesize:number,
                  thePageNumber:number,
                  categoryId:number): Observable<GetResponse> {
    const searchUrl=`${this.baseUrl}?page=${thePageNumber}&size=${thePagesize}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }

  //get all products by search keyword and pagination
  getProductBySearchKeywordPagination(thePagesize:number,
                                      thePageNumber:number,
                                      keyword:string):Observable<GetResponse>{
    const searchByKeywordUrl=`${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${thePageNumber}&size=${thePagesize}`;
    return this.httpClient.get<GetResponse>(searchByKeywordUrl);
  }

  //get all categories with id
  getCategoriesList():Observable<Categories[]>{
    return this.httpClient.get<GetResponseCategories>(this.categoryUrl).pipe(
      map(res=>res._embedded.productCategory)
    )
  }

  //get details product by product id
  getProductById(id:number):Observable<Product>{
    const searchByIdUrl=`${this.baseUrl}/${id}`
    return this.httpClient.get<Product>(searchByIdUrl);
  }

}

// template for category
interface GetResponseCategories {
  _embedded: {
    productCategory: Categories[];
  }
}

// template for list products with pagination
interface GetResponse {
  _embedded: {
    products: Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

