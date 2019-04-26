import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { C404Component } from './pages/c404/c404.component';
import { BlankComponent } from './pages/blank/blank.component';
import { VendedorComponent } from './pages/vendedor/vendedor.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { MasterComponent } from './_layout/master/master.component';
import { InsideLayoutComponent } from './_layout/inside-layout/inside-layout.component';

import { AuthGuard } from './_guards';

const routes: Routes = [  

  //LAYOUT DEFAULT INDEX
  // { 
  //   path: '', 
  //   canActivate: [AuthGuard],
  //   component: MasterComponent,
  //   children: [
      
  //   ]
  // },


  // { path: '', component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  

  //LAYOUT INSIDER
  { 
    path: '', 
    canActivate: [AuthGuard],
    component: InsideLayoutComponent,
    children: [
      { path: 'vendedor', component: VendedorComponent },
      { path: 'dashboard', component: DashboardComponent, data: {animation: 'FilterPage'}  },      
      { path: 'pedidos', component: PedidosComponent },
      { path: 'pedido', component: PedidoComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'carrinho', component: CarrinhoComponent },
      { path: 'produto/:id', component: ProdutoComponent },
      { path: 'checkout', component: CheckoutComponent },
    ]
  },


  


  //no layout routes
  
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: '404', component: C404Component },  
  { path: 'blank', component: BlankComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '/dashboard' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
