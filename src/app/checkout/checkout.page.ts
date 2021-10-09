import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { IProduct } from './../data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

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

	getTotal(): number {
		return this.cart.reduce((i, j) => i + j.price * j.price, 0);
	}
}
