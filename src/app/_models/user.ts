import { Vendedor } from './vendedor';

export class User {
    id: number;
    nome: string;
    password: string;
    celular: string;
    email: string;
    token: string;
    vendedores:Vendedor[];
}