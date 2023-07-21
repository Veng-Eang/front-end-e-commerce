import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-detais',
  templateUrl: './products-detais.component.html',
  styleUrls: ['./products-detais.component.css']
})
export class ProductsDetaisComponent implements OnInit {
  product?:Product;
  id?:number;
  constructor(private productService:ProductService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=+this.route.snapshot.paramMap.get('id')!;
    this.productById(this.id);
  }
  private productById(id:number){
    this.productService.getProductById(id).subscribe(
      data=>{
        this.product=data;
      }
    );
  }

}
