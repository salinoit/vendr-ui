import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../_services/validation.service'
import { BundleService } from '../../_services/bundle.service'
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

   constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private bundleService:BundleService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, ValidationService.emailValidator]],
        password: ['', Validators.required]
    });
  
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.bundleService.AddScript('./assets/js/main.js');

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {    
    this.submitted = true;    
    // stop here if form is invalid
    if (this.loginForm.invalid) {      
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
               if (data==null)
               {
                this.alertService.warning("Login inválido");
                this.loading=false;
               }
               else{
                this.router.navigate([this.returnUrl]);
               }
            },
            error => {
                this.alertService.warning(error);
                this.loading = false;
            });
  }  
}
