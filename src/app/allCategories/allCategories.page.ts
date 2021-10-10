import { Component, OnInit,ViewChild, ElementRef, } from '@angular/core';
import { DataService } from '../data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'allCategories',
  templateUrl: './allCategories.page.html',
  styleUrls: ['./allCategories.page.scss'],
})
export class AllCategories implements OnInit {
  public categories = <any>[];
  public featuredProducts = [];
  public bestSellProducts = [];

  constructor(
    private dataService: DataService,
    public navCtrl: NavController,
    private router: Router, 
       private modalCtrl: ModalController

  ) { }
  cartItemCount: BehaviorSubject<number>;
  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;

  ngOnInit() {
    this.dataService.getCategories().subscribe((data)=>{ 
    this.categories=data['category'];    
    })
    this.cartItemCount = this.dataService.getCartItemCount();
    //this.categories = this.dataService.getCategories();
  }

  navigate(path ) {
    this.router.navigate([path]);
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
