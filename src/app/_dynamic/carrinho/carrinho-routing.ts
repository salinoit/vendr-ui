import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarrinhoComponent } from './carrinho.component';

const routes: Routes = [
  { path: '', component: CarrinhoComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


