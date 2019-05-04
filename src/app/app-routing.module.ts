import { NgModule } from '@angular/core';
import { NoPreloading, PreloadingStrategy, Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { C404Component } from './pages/c404/c404.component';
import { BlankComponent } from './pages/blank/blank.component';
import { VendedorComponent } from './pages/vendedor/vendedor.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { PerfilComponent } from './_dynamic/perfil/perfil.component';
import { CarrinhoComponent } from './_dynamic/carrinho/carrinho.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { InsideLayoutComponent } from './_layout/inside-layout/inside-layout.component';
import { AppRoutingLoaderService } from '@app/app-routing-loader.service';
import { AuthGuard } from './_guards';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    component: InsideLayoutComponent,
    children: [
      { path: 'vendedor', component: VendedorComponent },
      { path: 'dashboard', component: DashboardComponent, data: {animation: 'FilterPage'}  },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'pedido', component: PedidoComponent },
      { path: 'perfil', loadChildren: '@app/_dynamic/perfil/perfil.module#PerfilModule' },
      { path: 'carrinho', loadChildren: '@app/_dynamic/carrinho/carrinho.module#CarrinhoModule' },
      { path: 'produto/:id', component: ProdutoComponent },
      { path: 'checkout', component: CheckoutComponent },
    ]
  },
  { path: 'login', component: LoginComponent, data: { preload: true }},
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: '404', component: C404Component },
  { path: 'blank', component: BlankComponent },
  { path: '**', redirectTo: '/dashboard' },
];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: AppRoutingLoaderService  }),
//   ],
//   exports: [RouterModule],
//   // providers: [AppRoutingLoaderService]
// })
// export class AppRoutingModule { }

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
