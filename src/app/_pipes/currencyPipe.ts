import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)


@Pipe({
  name: 'currencyformat'
})
export class CurrencyFormatPipe implements PipeTransform {
//transform(value: number, locale: string, currency_symbol: string, number_format: string = '1.2-2'): string {
  transform(value: any, currency: string, symbol: boolean = false, locale: string, currency_symbol: string, number_format: string= '1.2-2'): string {
        if (value) {

            let currencyPipe = new CurrencyPipe("pt-BR");
            let new_value: string;

            new_value = currencyPipe.transform(value, locale, currency_symbol, number_format);
            new_value=new_value.replace('US$','R$');

            if (locale = 'BRL') {
                new_value = new_value.replace('.', '|').replace('.', ',').replace('|', '.');
            }
            if (locale = '') {
                new_value = new_value.replace('.', '|').replace('.', ',').replace('|', '.');
            }

            return new_value
        }
    }
}


@NgModule({
  declarations: [
    CurrencyFormatPipe
  ],
  exports:[CurrencyFormatPipe]
})
export class PiperModule { }
