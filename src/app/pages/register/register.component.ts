import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BundleService } from '@app/_services/bundle.service';
import { User } from '@app/_models';
import { ValidationService, AlertService, UserService, AuthenticationService } from '@app/_services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private bundleService: BundleService,
    ) {
        // REDIRECIONAR PARA A HOME SE JA ESTIVER LOGADO
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            nome: ['', Validators.required],
            email: ['', [Validators.required,ValidationService.emailValidator]],
            celular: ['', [Validators.required,Validators.maxLength(11),Validators.minLength(11)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            password2: ['',[Validators.required, Validators.minLength(6)]]
        }
        ,
        {
            validator:ValidationService.MustMatch('password', 'password2')
        });

        this.bundleService.AddScript('./assets/js/main.js');
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        let user = new User();
        user.email = this.registerForm.get('email').value;
        user.nome = this.registerForm.get('nome').value;
        user.fone = this.registerForm.get('celular').value;
        user.senha = this.registerForm.get('password').value;

        this.loading = true;
        this.userService.register(user)
            .pipe(first())
            .subscribe(
                data => {
                  console.log(data);
                  if (data == 'OK') {
                    this.alertService.success('Registro efetuado com sucesso', true);
                    setTimeout(() => {
                      this.router.navigate(['/dashboard']);
                    }, 3000);
                  }
                  else if (data == 'EXIST')
                  {
                    this.alertService.success('Já existe um cadastro com este e-mail', true);
                    this.loading = false;
                  }
                  else
                  {
                    this.alertService.success('Usuário já cadastrado!', true);
                    this.loading = false;
                  }
                },
                error => {

                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
