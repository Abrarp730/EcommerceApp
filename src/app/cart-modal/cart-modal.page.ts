import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { IProduct } from './../data.service';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-cart-modal',
	templateUrl: './cart-modal.page.html',
	styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
	cart: IProduct[] = [];

	constructor(
		private dataService: DataService,
		private modalCtrl: ModalController
	) {}

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

	close(): void {
		this.modalCtrl.dismiss();
	}

	checkout() {}
}
