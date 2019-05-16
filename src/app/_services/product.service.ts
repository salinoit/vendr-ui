import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { RetProduct, User, Product, ProductPage } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ProductService {

    constructor(private http: HttpClient) {

     }

    getAll() {
        return this.http.get<Product[]>(`${environment.apiUrl}/produto`);
    }

    getPaged(page:number,size:number,search:string,vendedor:number,orderby:number,tipo: number ) { //vendedor 0 = todos
      console.log(`${environment.apiUrl}/produto/paged/${page}/${size}?search=${search}&vendedor=${vendedor}&order=${orderby}&tipo=${tipo}`);
        return this.http.get<ProductPage>(`${environment.apiUrl}/produto/paged/${page}/${size}?search=${search}&vendedor=${vendedor}&order=${orderby}&tipo=${tipo}`);
    }

    getById(id: number) {
        return this.http.get<RetProduct>(`${environment.apiUrl}/produto/${id}`);
    }





}
