import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from "rxjs";
import { HttpClient } from '@angular/common/http';

// Category Interface
export interface ICategory {
  id: number,
  name: string,
  image: string,
}

// Product Interface
export interface IProduct {
  id: number,
  name: string,
  price: number,
  image: string,
  Link: string | SafeResourceUrl,
  quantity:number
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  trustedVideoUrlArray: SafeResourceUrl[] = [];
  youtubeUrlsArray = [
    {
      link: "https://www.youtube.com/watch?v=EXG54G7Nv8o"
    },
    {
      link: "https://www.youtube.com/watch?v=EXG54G7Nv8o"
    }
  ]

  constructor(
    public navCtrl: NavController,
    private domSanitizer: DomSanitizer,
    private http:HttpClient
  ) { }

  ngOnInit() {
  }
  getLinks() {
    // for (let item of this.getFeaturedProducts()) {
    //   this.trustedVideoUrlArray.push(this.domSanitizer.bypassSecurityTrustResourceUrl(item.Link));
    // }
  }
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  getCategories() {
    // let categories = [];

    // let cat1: ICategory = {
    //   id: 1,
    //   name: 'Womens',
    //   image: '../../assets/categories/category-1.png'
    // }
    // let cat2: ICategory = {
    //   id: 2,
    //   name: 'Mens',
    //   image: '../../assets/categories/category-2.png'
    // }
    // let cat3: ICategory = {
    //   id: 3,
    //   name: 'Kids',
    //   image: '../../assets/categories/category-3.png'
    // }

    // categories.push(cat1, cat2, cat3);

    return this.http.get('https://cartapi.azurewebsites.net/api/HomePage/GetHomePage');
  }

  getFeaturedProducts(): IProduct[] {
    return [
      {
        id: 1,
        name: 'Womens T-Shirt',
        price: 55,
        image: '../../assets/products/prod-1.png',
        Link: 'https://www.youtube.com/embed/HLYyZgyK91Q',
        quantity:0
      },
      {
        id: 2,
        name: 'Mens T-Shirt',
        price: 34,
        image: '../../assets/products/prod-2.png',
        Link: 'https://www.youtube.com/embed/ejSeKN43pIw',
        quantity:0
      },
      {
        id: 3,
        name: 'Womens T-Shirt',
        price: 40,
        image: '../../assets/products/prod-3.png',
        Link: 'https://www.youtube.com/embed/HLYyZgyK91Q',
        quantity:0
      }];
  }

  getBestSellProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 55,
      image: '../../assets/products/prod-4.png',
      Link: 'https://www.youtube.com/embed/yVn57knucpM',
      quantity:0
        }
    let prod2: IProduct = {
      id: 2,
      name: 'Mens T-Shirt',
      price: 34,
      image: '../../assets/products/prod-5.png',
      Link: 'https://www.youtube.com/embed/P_-zxQYPy5w',
      quantity:0
    }
    let prod3: IProduct = {
      id: 3,
      name: 'Womens T-Shirt',
      price: 40,
      image: '../../assets/products/prod-6.png',
      Link: 'https://www.youtube.com/embed/P_-zxQYPy5w',
      quantity:0
    }

    products.push(prod1, prod2, prod3);

    return products;
  }

  addProduct(product: IProduct) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.quantity += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.quantity = 1;
      this.cart.push(product);
      console.log(`product ${product.name} pushed to cart`);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
  getProducts(): IProduct[] {
    return this.getFeaturedProducts();
  }

  getCart(): IProduct[] {
    console.log("this.cart: ", this.cart);
    return this.cart;
  }

  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.quantity -= 1;
        if (p.quantity == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.quantity);
        this.cart.splice(index, 1);
      }
    }
  }
}
