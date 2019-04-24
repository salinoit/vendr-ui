import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BundleService } from '../../_services/bundle.service'
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
        private bundleService:BundleService,
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
        },
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

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
