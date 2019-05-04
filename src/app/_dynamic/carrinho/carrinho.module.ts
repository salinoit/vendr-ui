// COMMON
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CarrinhoComponent} from './carrinho.component';
import { AppModule } from '@app/app.module';
import { CommonModule } from '@angular/common';
import { routing } from './carrinho-routing';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { PiperModule } from '@app/_pipes/currencyPipe';

@NgModule({
  declarations: [
    CarrinhoComponent
  ],
  imports: [
    routing,
    PiperModule,
    CommonModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [CarrinhoComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA ]
})
export class CarrinhoModule { }
