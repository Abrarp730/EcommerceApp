import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { DataService, IProduct } from './../data.service';
import { Component, OnInit, ViewChild, ElementRef, Pipe } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from './../cart-modal/cart-modal.page';


@Component({
  selector: 'app-videos-card',
  templateUrl: './videos-card.page.html',
  styleUrls: ['./videos-card.page.scss'],
})

export class MyVideoCardPage implements OnInit {

  trustedVideoUrlArray: SafeResourceUrl[] = [];
  youtubeUrlsArray: any[] = [
    {
      id: 1,
      name: 'youtube',
      Link: "https://www.youtube.com/watch?v=EXG54G7Nv8o"
    },
    {
      id: 2,
      name: 'youtube2',
      Link: "https://www.youtube.com/watch?v=EXG54G7Nv8o"
    }
  ]

  constructor(
    public navCtrl: NavController,
    private domSanitizer: DomSanitizer,
    private dataSrvice: DataService,
    private modalCtrl: ModalController
  ) { }

  cart = [];
  products: IProduct[] = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;

  ngOnInit() {

    // for (let item of this.youtubeUrlsArray) {
    //   this.trustedVideoUrlArray.push(this.domSanitizer.bypassSecurityTrustResourceUrl(item.Link));
    // }
    this.products = this.dataSrvice.getFeaturedProducts();
    this.products.forEach((v, i) => {
      v.Link = this.domSanitizer.bypassSecurityTrustResourceUrl(v.Link.toString());
    });
    console.log(this.products);
    this.cart = this.dataSrvice.getCart();
    this.cartItemCount = this.dataSrvice.getCartItemCount();
    console.log(this.cartItemCount, "cartItemCount");

  }


  addToCart(product: IProduct) {
    console.log(`add ${product.name} to cart`)
    this.animateCSS('jello');
    this.dataSrvice.addProduct(product);
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);

    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  // copied from animate.css github page: https://github.com/daneden/animate.css
  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName);


    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd);
    }
    node.addEventListener('animationend', handleAnimationEnd);
  }

}
