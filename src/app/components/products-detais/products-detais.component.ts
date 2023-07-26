import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-detais',
  templateUrl: './products-detais.component.html',
  styleUrls: ['./products-detais.component.css']
})
export class ProductsDetaisComponent implements OnInit {
  product:Product=new Product();
  id?:number;
  constructor(private productService:ProductService,
              private cartService:CartService,
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
  onAddToCart(){
    const cartItem=new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }


}
