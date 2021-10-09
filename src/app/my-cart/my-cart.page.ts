import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { IProduct } from './../data.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {

  constructor(private dataService: DataService,) { }
  cart: IProduct[] = [];

  ngOnInit() {
    this.cart = this.dataService.getCart();
  }
  decreaseCartItem(product: IProduct): void {
		this.dataService.decreaseProduct(product);
	}

	increaseCartItem(product: IProduct): void {
		this.dataService.addProduct(product);
	}
  removeCartItem(product: IProduct): void {
		this.dataService.removeProduct(product);
	}
}
