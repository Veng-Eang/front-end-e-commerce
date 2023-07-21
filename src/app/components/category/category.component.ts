import { ProductService } from 'src/app/services/product.service';
import { Categories } from 'src/app/common/categories';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories : Categories[]=[];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.listCategory();
  }
  listCategory() {
    this.productService.getCategoriesList().subscribe(
      data=>{
        this.categories=data;
      }
    )
  }
}


