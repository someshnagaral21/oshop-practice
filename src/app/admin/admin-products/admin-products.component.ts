// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ProductService } from 'src/app/product.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-admin-products',
//   templateUrl: './admin-products.component.html',
//   styleUrls: ['./admin-products.component.css']
// })
// export class AdminProductsComponent implements OnInit, OnDestroy {
  
//   products: any[];
//   filteredProducts: any[];
//   subscription: Subscription;


//   constructor(private productService: ProductService) { 
//     this.subscription =  this.productService.getAll()
//     .subscribe(products => this.filteredProducts = this.products = products);
    
//   }

//   filter(query: string){
//     this.filteredProducts = (query) ?
//       this.products.filter(p => p.payload.val().title && 
//       p.payload.val().title.toLowerCase().includes(query.toLowerCase())) : 
//       this.products;
//   }

//   ngOnDestroy(){
//     this.subscription.unsubscribe();
//   }

//   ngOnInit() {
//   }

// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  source: LocalDataSource;
  
  constructor(
    private productService: ProductService,
    private router: Router) { 
    this.source = new LocalDataSource();

    this.subscription =  this.productService.getAll().valueChanges()
    .subscribe(products => { 
      this.filteredProducts = this.products = products;
      this.source.load(this.filteredProducts);
    });
    
  }

  filter(query: string){
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title && 
      p.title.toLowerCase().includes(query.toLowerCase())) : 
      this.products;
      
  }

    settings = {
    columns: {
      title: {
        title: 'Title',
        filter: false,
        sortDirection: 'asc'
      },
      price: {
        title: 'Price',
        filter: false,
        sortDirection: 'asc'
      },
      
    },

    edit:{
      editButtonContent: 'Edit',
    },

    actions: {
      delete: false,
      add: false,
    },
    editable:false,
    mode: 'external'
  };

  openEditForm(event: any) {
    
    this.router.navigate(['/admin/products/' + event.data.id]);
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}

