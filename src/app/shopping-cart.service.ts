import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }
  products: any[] = [];

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }
  

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(cartId){
      return cartId;
    }
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;

  }

  async addToCart(products){
    let cartId = await this.getOrCreateCartId();
    let item$: Observable<any> = this.db.object('/shopping-carts/' + cartId + '/items/' + products.id).valueChanges();
    let item$$ =  this.db.object('/shopping-carts/' + cartId + '/items/' + products.id);
    item$.take(1).subscribe(item => {
      if(item == null){
        item$$.set({products: products, quantity: 1 }); 
      }
      else{
        item$$.update({quantity: item.quantity + 1});
      }
    });
  }
}
