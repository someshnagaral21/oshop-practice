import { Component, OnInit, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
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

  categories$;
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    route: ActivatedRoute,
    productService: ProductService, 
    categoryService: CategoryService) { 
      
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
  
    this.categories$ = categoryService.getCategories().valueChanges();
    
  }
  
  // ngOnChanges(changes: SimpleChanges) {  
  // }
  
  addToCart(products){
    this.cartService.addToCart(products);
  }

  getquantity(){
    if(!this.shoppingCart)
    {
      return 0;
    }
    let item = this.shoppingCart[this.product.id];
    return item ? item.quantity : 0;
  }

  async ngOnInit(){
    this.subscription = (await this.cartService.getCart()).valueChanges()
    .subscribe(cart => this.cart = cart);  
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}



