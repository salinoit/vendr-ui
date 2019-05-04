import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, Product, ProductPage } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Product[]>(`${environment.apiUrl}/produto`);
    }

    getPaged(page:number,size:number,search:string,vendedor:number,orderby:number ) { //vendedor 0 = todos
        return this.http.get<ProductPage>(`${environment.apiUrl}/produto/paged/${page}/${size}?search=${search}&vendedor=${vendedor}&order=${orderby}`);
    }

    getById(id: number) {
        return this.http.get<Product>(`${environment.apiUrl}/produto/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }


}
