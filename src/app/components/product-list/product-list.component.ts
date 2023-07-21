import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import {ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  categoryName:string='';
  currentCategoryId:number=1;
  currentKeyword:string='';
  previousCategoryId: number=1;
  thePageNumber:number=1;
  thePageSize:number=12;
  totalElements:number=0;
  searchMode=false;
  previousKeyword: string='';

  constructor(private productService: ProductService,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
  }

  // choose list products by search keyword or by category
  listProducts() {
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchListProducts();
    }else{
      this.handleListProducts();
    }
  }

  // list products by search keyword
  handleSearchListProducts() {
    const isHasKeyword=this.route.snapshot.paramMap.has('keyword');
    if(isHasKeyword){
      this.currentKeyword = this.route.snapshot.paramMap.get('keyword')!;
    }
    if(this.previousKeyword!=this.currentKeyword){
        this.thePageNumber=1;
    }
    this.previousKeyword=this.currentKeyword;
    this.productService.getProductBySearchKeywordPagination(this.thePageSize,
                                                            this.thePageNumber-1,
                                                            this.currentKeyword)
                                                            .subscribe(
                                                                this.result()
                                                              )
  }

  // list products by category
  handleListProducts(){
    const isHasCategory:boolean=this.route.snapshot.paramMap.has('id');
    const isHasCategoryName:boolean=this.route.snapshot.paramMap.has('name');
    if(isHasCategoryName){
      this.categoryName=this.route.snapshot.paramMap.get('name')!;
    }

    if(this.previousCategoryId!=this.currentCategoryId){
      this.thePageNumber=1;
    }
    this.previousCategoryId=this.currentCategoryId;

    if(isHasCategory){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.productService.getProductListPagination( this.thePageSize,
        this.thePageNumber-1,
        this.currentCategoryId)
        .subscribe(
          this.result()
        )
    }else{
      this.productService.getProductList(this.thePageSize,
        this.thePageNumber-1,
        this.currentCategoryId)
      .subscribe(
        this.result()
      )
    }



  }

  // return result for subscription
  result(){
    return (data:any)=>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.totalElements=data.page.totalElements;
    }
  }

  updatePageSize(pageChange:string){
    this.thePageSize=+pageChange;
    this.thePageNumber=1;
    this.listProducts();
  }

}
