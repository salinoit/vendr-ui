// COMMON
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// ROUTING
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// HELPERS
import { fakeBackendProvider, JwtInterceptor, ErrorInterceptor } from './_helpers';

// SERVICES
import { ValidationService,BundleService,AlertService,AuthenticationService,UserService } from '@app/_services';

//COMPONENT LAYOUT
import { MasterComponent } from './_layout/master/master.component';
import { InsideLayoutComponent } from './_layout/inside-layout/inside-layout.component';

//COMPONENT PAGES
import { CarrinhoComponent,PerfilComponent,PedidoComponent,
         PedidosComponent,VendedorComponent,
         RegisterComponent,LoginComponent,ForgotComponent,
         DashboardComponent,BlankComponent,C404Component,
         ProdutoComponent, CheckoutComponent } from './pages';

//OTHERS
import { AlertComponent } from './_components/alert.component';
import { TopSearchComponent } from './_components/top-search/top-search.component';
import { FooterComponent } from './footer/footer.component';
import { ControlMessagesComponent } from './_components/control-messages/control-messages.component';
import {NgxMaskModule} from 'ngx-mask';
import { BreadcumbComponent } from './_components/breadcumb/breadcumb.component';
import { InputComponent } from './_components/input/input.component';
import { CurrencyFormatPipe  } from './_pipes/currencyPipe';


@NgModule({
  declarations: [    
    CurrencyFormatPipe,
    AppComponent,LoginComponent,MasterComponent,        
    BlankComponent,C404Component,DashboardComponent,        
    ForgotComponent,RegisterComponent,AlertComponent,        
    TopSearchComponent,FooterComponent,ControlMessagesComponent, 
    InsideLayoutComponent,VendedorComponent, PedidosComponent, PedidoComponent, PerfilComponent, CarrinhoComponent,
     ProdutoComponent, CheckoutComponent, BreadcumbComponent, InputComponent, 
  ],
  imports: [
    BrowserModule,AppRoutingModule,FormsModule,        
    ReactiveFormsModule,HttpClientModule,
    NgxMaskModule.forRoot()   
  ],
  providers: [
    ValidationService,
    BundleService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },        
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
