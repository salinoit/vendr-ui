// tslint:disable
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first,distinctUntilChanged } from 'rxjs/operators';
import { CepService,BundleService } from '@app/_services'
import { CartService, ValidationService, AlertService, UserService, AuthenticationService } from '@app/_services';
import { Municipio, UnidadeFederal, Cep } from '@app/_models/cep';
import { Cart, User } from '@app/_models/';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

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
  currentUser: User;

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
      private http: HttpClient,
      private cartService: CartService
  ) {
  }

  ngOnInit() {
    this._estados = [];
    this._municipios = [];
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
      this.Config();


      this.bundleService.AddScript('./assets/js/main.js');
  }




  Config()
  {
    this.authenticationService.currentUserSubject.subscribe(p=>
      {
          this.currentUser = p;
      });
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

    try {
      this.cepService.getEstados();
      this.cepService.getLocalidades('35'); //sp
    }
    catch(e)
    {}

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
      // stop here if form is invalid
      this.submitted = true;
      if (this.checkoutForm.invalid) {
          return;
      }

      var id_vendedor=localStorage.getItem('vendedor');

      if (id_vendedor) {
        if (parseInt(id_vendedor)<=0) return;
      }
      else
      {
        return;
      }

      var id_consumidor = this.currentUser.id_consumidor;
      this.loading = true;

      var localCart = JSON.parse(localStorage.getItem('currentCart')) as Cart;
      if (localCart)
      {
         this.http.post(`${environment.apiUrl}/pedido?id_consumidor=${id_consumidor}&id_vendedor=${id_vendedor}`, localCart).subscribe(
              data => {
                if (data==null)
                {
                  this.alertService.warning("Erro no servidor. Tente novamente mais tarde!");
                  this.loading=false;
                }
                else{
                  this.cartService.Clear();
                  this.router.navigate(['/pedidos']);
                  this.loading = false;
                }
            },
            error => {
                this.alertService.warning("Erro no servidor. Tente novamente mais tarde!");
                this.loading = false;
            });
      }
      else
      {
        this.alertService.warning("Nehum item no carrinho de compras !");
        this.loading = false;
      }

    }

  buscaCep(c) {
    if (c) {
      if (c!='' && c.length>=8) {
        this.cepService.buscar(c);
      }
    }
  }
}
