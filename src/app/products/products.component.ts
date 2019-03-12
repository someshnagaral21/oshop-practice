import { Component, OnInit, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping.cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input('shopping-cart') shoppingCart;
  @Input('product') product: any;

  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  
  constructor(
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute,
    private productService: ProductService) { 
    
  }

  async ngOnInit(){
    this.cart$ = (await this.shoppingCartService.getCart());
    this.populateProducts();
   
  }

  private populateProducts(){
    this.productService
    .getAll()
    .valueChanges()
    .switchMap(products => 
      {
      this.products = products;
      return this.route.queryParamMap;
      })

      .subscribe( params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter(){        
      this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category):
      this.products;
  }
}



