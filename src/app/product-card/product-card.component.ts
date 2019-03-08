import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: any;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product){
    this.cartService.addToCart(product);
  }

  getQuantity(){
    if(!this.shoppingCart)
    {
      return 0;
    }
    let item = this.shoppingCart.items[this.product.id];
    return item ? item.quantity : 0;
  }


}
