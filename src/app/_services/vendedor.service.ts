import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Vendedor } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class VendedorService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Vendedor[]>(`${environment.apiUrl}/vendedor`);
    }

    getById(id: number) {
        return this.http.get<Vendedor>(`${environment.apiUrl}/vendedor/${id}`);
    }
}
