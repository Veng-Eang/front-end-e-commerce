import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes ,RouterModule} from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { SearchComponent } from './components/search/search.component';
import { ProductsDetaisComponent } from './components/products-detais/products-detais.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';


const appRoutes:Routes=[
  {path:'products',component:ProductListComponent},
  {path:'products/:id',component:ProductsDetaisComponent},
  {path:'search/:keyword',component:ProductListComponent},
  {path:'category/:id/:name',component:ProductListComponent},
  {path:'',redirectTo:'/products',pathMatch:'full'},
  {path:'**',redirectTo:'/products',pathMatch:'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CategoryComponent,
    SearchComponent,
    ProductsDetaisComponent,
    CartStatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
