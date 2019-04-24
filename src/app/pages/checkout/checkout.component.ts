import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first,distinctUntilChanged } from 'rxjs/operators';
import { CepService,BundleService } from '@app/_services'
import { ValidationService, AlertService, UserService, AuthenticationService } from '@app/_services';
import { Cep } from '@app/_models/cep';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  loading = false;
  submitted = false;
  cep=new Cep();
  

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private alertService: AlertService,
      private bundleService:BundleService,
      private cepService:CepService
  ) { 
      // // REDIRECIONAR PARA A HOME SE JA ESTIVER LOGADO
      // if (this.authenticationService.currentUserValue) { 
      //     this.router.navigate(['/']);
      // }
      
  }

  ngOnInit() {
      this.checkoutForm = this.formBuilder.group({
          nome: ['', Validators.required],
          sobrenome: ['', Validators.required],
          email: ['', [Validators.required,ValidationService.emailValidator]],
          telefone: ['', [Validators.required,Validators.maxLength(11),Validators.minLength(11)]],
          cep: ['', [Validators.required,Validators.maxLength(8),Validators.minLength(8)]],          
          endereco: ['', Validators.required],
          formapagto:['boleto',Validators.required],
          cartao:['5180271171683285', [ValidationService.creditCardValidator]],
          codigo_seguranca:['',null]
          // cidade: ['', Validators.required],
          // estado: ['', Validators.required],
      },
      { 
          
      });
      this.addExtendValidation();
      
      this.bundleService.AddScript('./assets/js/main.js');
  }

  buscaCep(c){
    this.cepService.buscar(c).unsubscribe()
    {
      alert(2);
      console.log(this.cepService.resultado);
    }            
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

      this.loading = true;
      this.router.navigate(['/login']); 
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
}
