import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Pedido, PedidoFiltro } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class PedidoService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Pedido[]>(`${environment.apiUrl}/pedido/all`);
    }

    getFiltered(f: PedidoFiltro) {

        return this.http.post<Pedido[]>(`${environment.apiUrl}/pedido/filter`,f);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/pedido/${id}`);
    }

    register(pedido: Pedido) {
        return this.http.post(`${environment.apiUrl}/pedido/`, pedido);
    }

    update(pedido: Pedido) {
        return this.http.put(`${environment.apiUrl}/pedido/${pedido.id_pedido}`, pedido);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/pedido/${id}`);
    }

}
