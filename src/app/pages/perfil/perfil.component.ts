import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BundleService } from '../../_services/bundle.service'
import { ValidationService, AlertService, UserService, AuthenticationService } from '@app/_services';
import { User } from '@app/_models';
import { Subscription } from 'rxjs';

@Component({templateUrl: 'perfil.component.html'})
export class PerfilComponent implements OnInit {
    currentUser:User;
    currentUserSubscription: Subscription;
    profileForm: FormGroup;
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

      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;

    });
     }

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            nome: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.bundleService.AddScript('./assets/js/main.js');
    }

    // convenience getter for easy access to form fields
    get f() { return this.profileForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.profileForm.invalid) {
            return;
        }

        //this.loading = true;
        // this.userService.register(this.profileForm.value)
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
