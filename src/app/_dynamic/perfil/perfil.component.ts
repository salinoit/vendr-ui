import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BundleService } from '@app/_services/bundle.service';
import { ValidationService, AlertService, UserService, AuthenticationService } from '@app/_services';
import { User } from '@app/_models';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({templateUrl: 'perfil.component.html'})
export class PerfilComponent implements OnInit {
    currentUser: User;
    currentUserSubscription: Subscription;
    profileForm: FormGroup;
    loading = false;
    submitted = false;

    public imagePath;
    public message: string;
    userAvatar: any;

    profilePicture(vr)
    {
        if (vr) {
          var gh='';
          if(vr.indexOf('data:image')<0)
          {
              gh='data:image/png;base64,';
          }
          this.userAvatar = this.sanitizer.bypassSecurityTrustUrl(gh + vr);
          } else
          {
          this.userAvatar = '../../../assets/images/user.png';
          }
    }
    preview(files) {
      if (files.length === 0)
        return;

      var mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.userAvatar = reader.result;
      }
    }
    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private bundleService: BundleService,
        private userService: UserService,
        private alertService: AlertService,
        private sanitizer: DomSanitizer

    ) {

      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.profilePicture(user.foto);
    });
     }

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            nome: [this.currentUser.nome, Validators.required],
            fone: [this.currentUser.fone, [Validators.required,Validators.maxLength(11),Validators.minLength(11)]],
            password: [this.currentUser.senha, [Validators.required, Validators.minLength(6)]],
            password2: [this.currentUser.senha,[Validators.required, Validators.minLength(6)]]
        },
        {
            validator:ValidationService.MustMatch('password', 'password2')
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

        this.loading = true;
        var user = this.currentUser;
        user.nome = this.profileForm.get('nome').value;
        user.fone = this.profileForm.get('fone').value;
        user.senha = this.profileForm.get('password').value;
        if (this.userAvatar){
          if (this.userAvatar.indexOf('../')<0) {
            user.foto = this.userAvatar;
          }
        }

        this.loading = false;
        this.userService.update(user)
            .pipe(first())
            .subscribe(
                data => {

                    this.updateLoginData();
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

      updateLoginData(){

        this.authenticationService.login(this.currentUser.email, this.currentUser.senha)
          .pipe(first())
          .subscribe(
              data => {
                 if (data==null)
                 {
                  this.loading=false;
                 }
                 else{
                  this.alertService.success('Dados atualizados com sucesso', true);
                  this.loading=false;
                 }
              },
              error => {
                this.loading=false;
              });
      }
}
