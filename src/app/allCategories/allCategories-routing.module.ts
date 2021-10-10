import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllCategories } from './allCategories.page';

const routes: Routes = [
  {
    path: '',
    component: AllCategories
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllCategoriesRoutingModule {}
