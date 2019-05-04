// COMMON
import { NgModule, CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA  } from '@angular/core';
import { PerfilComponent} from './perfil.component';
import { AppModule } from '@app/app.module';
import { routing } from '@app/_dynamic/perfil/perfil-routing';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared.module';
import { ValidationService,BundleService,AlertService,AuthenticationService,UserService } from '@app/_services';

@NgModule({
  declarations: [
    PerfilComponent,

  ],
  imports: [
    SharedModule,
    routing,
    // FormsModule,ReactiveFormsModule,
  ],
  providers: [

  ],
  bootstrap: [PerfilComponent],
  schemas:[ ] //CUSTOM_ELEMENTS_SCHEMA
})
export class PerfilModule { }
