import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Municipio, Cep,UnidadeFederal } from "@app/_models/cep";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CepService {
  resultado: Cep;
  cepSubject: BehaviorSubject<Cep>;
  ufSubject: BehaviorSubject<UnidadeFederal[]>;
  municipioSubject: BehaviorSubject<Municipio[]>;

  constructor(private http:HttpClient) {

    this.cepSubject = new BehaviorSubject<Cep>(null);
    this.ufSubject = new BehaviorSubject<UnidadeFederal[]>([]);
    this.municipioSubject = new BehaviorSubject<Municipio[]>([]);
  }

  getEstados()
  {
    return this.http
          .get<UnidadeFederal[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
          .subscribe(data => {
              this.ufSubject.next(data as UnidadeFederal[]);
          });
  }

  getLocalidades(uf: string)
  {
    return this.http
          .get<Municipio[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
          .subscribe(data => {
              this.municipioSubject.next(data as Municipio[]);
          });
  }

  buscar(cep:string){
      return this.http
          .get(`https://viacep.com.br/ws/${cep}/json/`)
          .subscribe(data => {
              this.resultado = this.converterRespostaParaCep(data)
              this.cepSubject.next(this.resultado);
          });
    }

    private converterRespostaParaCep(cepNaResposta):Cep{
        let cep = new Cep();
        cep.cep = cepNaResposta.cep;
        cep.logradouro = cepNaResposta.logradouro;
        cep.complemento = cepNaResposta.complemento;
        cep.bairro = cepNaResposta.bairro;
        cep.cidade = cepNaResposta.localidade;
        cep.estado = cepNaResposta.uf;
        return cep;
    }

}
