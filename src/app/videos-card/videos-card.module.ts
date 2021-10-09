import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyVideoCardPageRoutingModule } from './videos-card-routing.module';

import { MyVideoCardPage } from './videos-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyVideoCardPageRoutingModule
  ],
  declarations: [MyVideoCardPage]
})
export class MyVideoCardPageModule {}
