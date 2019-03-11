import { Component, OnInit, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  @Input('shopping-cart') shoppingCart;
  @Input('product') product: any;

  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    route: ActivatedRoute,
    productService: ProductService) { 
      
    productService
    .getAll()
    .valueChanges()
    .switchMap(products => 
      {
      this.products = products;
      return route.queryParamMap;
      })

      .subscribe( params => {
        this.category = params.get('category');
        
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category):
          this.products;
      });
  
  }

  async ngOnInit(){
    this.subscription = (await this.shoppingCartService.getCart())
    .subscribe(cart => {
      this.cart = cart;
      return this.cart;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}



