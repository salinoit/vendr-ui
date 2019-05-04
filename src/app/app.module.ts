// COMMON

import { NgModule, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InsideLayoutComponent } from '@app/_layout/inside-layout/inside-layout.component';
import {  BrowserModule  } from '@angular/platform-browser'; // <-- NgModel lives here

// ROUTING
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';

// HELPERS
import { fakeBackendProvider, JwtInterceptor, ErrorInterceptor } from './_helpers';

// SERVICES
import { ValidationService,BundleService,AlertService,AuthenticationService,UserService } from '@app/_services';

//COMPONENT LAYOUT
import { MasterComponent } from './_layout/master/master.component';


import { PiperModule } from './_pipes/currencyPipe';
import { SharedModule } from '@app/shared.module';

//OTHERS
import { AlertComponent } from './_components/alert.component';
import { TopSearchComponent } from './_components/top-search/top-search.component';
import { FooterComponent } from './footer/footer.component';


//COMPONENT PAGES
import { PedidoComponent,
  PedidosComponent,VendedorComponent,
  RegisterComponent,LoginComponent,ForgotComponent,
  DashboardComponent,BlankComponent,C404Component,
  ProdutoComponent, CheckoutComponent } from './pages';





@NgModule({
  declarations: [
    BlankComponent,C404Component,DashboardComponent,
    ForgotComponent,RegisterComponent,AlertComponent,
    TopSearchComponent,FooterComponent,LoginComponent,
    VendedorComponent, PedidosComponent, PedidoComponent,
    ProdutoComponent, CheckoutComponent,
    AppComponent,MasterComponent,InsideLayoutComponent

  ],
  imports: [
    routing,
    PiperModule,
    FormsModule,ReactiveFormsModule,
    CommonModule,
    HttpClientModule,BrowserModule,
    SharedModule
  ],
  providers: [
    ValidationService,
    BundleService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
