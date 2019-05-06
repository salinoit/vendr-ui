import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first,distinctUntilChanged } from 'rxjs/operators';
import { CepService,BundleService } from '@app/_services'
import { ValidationService, AlertService, UserService, AuthenticationService } from '@app/_services';
import { Municipio, UnidadeFederal, Cep } from '@app/_models/cep';
import { User } from '@app/_models/';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  loading = false;
  submitted = false;
  cep = null;


  _estados: UnidadeFederal[];
  _municipios: Municipio[];
  _use_city_cep=false;

  _estadoChange($event)
  {
    var id=this.checkoutForm.get('estado').value;
    this.cepService.getLocalidades(id.toString());
  }
  GetEstadoId(sigla: string)
  {
      for (let i of this._estados)
      {
          if (i.sigla == sigla ) return i.id;
      }
  }
  GetCidadeId(cidade: any)
  {
      for (let i of this._municipios)
      {
          if (i.nome == cidade ) return i.id;
      }
  }

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private alertService: AlertService,
      private bundleService:BundleService,
      private cepService:CepService,
  ) {
      // // REDIRECIONAR PARA A HOME SE JA ESTIVER LOGADO
      // if (this.authenticationService.currentUserValue) {
      //     this.router.navigate(['/']);
      // }

  }

  ngOnInit() {
    this._estados = [];
    this._municipios = [];

    this.cepService.cepSubject.subscribe(p=>
      {
        if (p) {
          try {
            this.cep=p;
            this._use_city_cep = true; //volta a ser false qando a lista de cidades voltar
            this.checkoutForm.controls['estado'].setValue(this.GetEstadoId(p.estado.toString()).toString());
            this.checkoutForm.controls['endereco'].setValue(p.logradouro);
          }
          catch(e)
          {}
        }
      });



      this.cepService.ufSubject.subscribe(p=>{
        this._estados=p.sort(this.compare);
      });

      this.cepService.municipioSubject.subscribe(p=>{
        if (p.length>0) {
        this._municipios=p;
        if (this._use_city_cep == true) {
          if (this.cep!=null) {
            console.log(this.cep);
            this.checkoutForm.controls['cidade'].setValue(this.GetCidadeId(this.cep.cidade));
            this._use_city_cep = false;
          }
        }
        else
        {
          this.checkoutForm.controls['cidade'].setValue(p[0].id.toString());
        }
        }
      });



    var user = JSON.parse(localStorage.getItem('currentUser')) as User;

      this.checkoutForm = this.formBuilder.group({
          nome: [user.nome, Validators.required],
          estado: ['35'],
          cidade:[''],
          sobrenome: ['', Validators.required],
          numero: ['', Validators.required],
          complemento: [''],
          email: [user.email, [Validators.required,ValidationService.emailValidator]],
          telefone: [user.fone, [Validators.required,Validators.maxLength(11),Validators.minLength(11)]],
          cep: ['', [Validators.required,Validators.maxLength(8),Validators.minLength(8)]],
          endereco: ['', Validators.required],
          formapagto:['boleto',Validators.required],
          cartao:['5180271171683285', [ValidationService.creditCardValidator]],
          codigo_seguranca:['',null]
      },
      {

      });
      this.addExtendValidation();

      this.cepService.getEstados();

      this.cepService.getLocalidades('35'); //sp

      this.bundleService.AddScript('./assets/js/main.js');

  }

  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const genreA = a.nome.toUpperCase();
    const genreB = b.nome.toUpperCase();

    let comparison = 0;
    if (genreA > genreB) {
      comparison = 1;
    } else if (genreA < genreB) {
      comparison = -1;
    }
    return comparison;
  }

  addExtendValidation() {
    const formaPagto = this.checkoutForm.get('formapagto');
    const cartao = this.checkoutForm.get('cartao');


    this.checkoutForm.get('formapagto').valueChanges.pipe(distinctUntilChanged())
      .subscribe(userCategory => {
        cartao.clearValidators();


        if (userCategory == 'credito') {
          cartao.setValidators([Validators.required,ValidationService.creditCardValidator]);
        }

        if (userCategory == 'boleto') {
          cartao.setValidators(null);
        }

        formaPagto.updateValueAndValidity();
        cartao.updateValueAndValidity();

      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.checkoutForm.controls; }

  onSubmit() {

      console.log(JSON.stringify(this.checkoutForm.value.formapagto));

      this.submitted = true;

      // stop here if form is invalid
      if (this.checkoutForm.invalid) {
          return;
      }

      console.log('qualquercoisa');

      // return this.http
      //     .get<Municipio[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
      //     .subscribe(data => {
      //         this.municipioSubject.next(data as Municipio[]);
      //     });


      this.loading = true;

      // this.userService.register(this.checkoutForm.value)
      //     .pipe(first())
      //     .subscribe(
      //         data => {
      //             this.alertService.success('Registration successful', true);
      //             this.router.navigate(['/login']);
      //         },
      //         error => {
      //             this.alertService.error(error);
      //             this.loading = false;
      //         });
  }

  buscaCep(c) {
    if (c) {
      if (c!='' && c.length>=8) {
        this.cepService.buscar(c);
      }
    }
  }
}
