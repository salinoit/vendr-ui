import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BundleService } from '../../_services/bundle.service'
import { ValidationService, AlertService, UserService, AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
    forgotForm: FormGroup;
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
    this.forgotForm = this.formBuilder.group({          
        email: ['', [Validators.required,ValidationService.emailValidator]]
    });
      
    this.bundleService.AddScript('./assets/js/main.js');
}

// convenience getter for easy access to form fields
get f() { return this.forgotForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotForm.invalid) {
        return;
    }

    // this.loading = true;
    // this.userService.register(this.forgotForm.value)
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
