import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllCategoriesRoutingModule } from './allCategories-routing.module';

import { AllCategories } from './allCategories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllCategoriesRoutingModule
  ],
  declarations: [AllCategories]
})
export class AllCategoriesPageModule {}
