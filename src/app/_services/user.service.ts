﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/usuario`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/usuario/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/usuario/`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/usuario/${user.id_usuario}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/usuario/${id}`);
    }

}
