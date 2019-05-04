import { NgModule, CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA  } from '@angular/core';
import { BreadcumbComponent } from '@app/_components/breadcumb/breadcumb.component';
import { ControlMessagesComponent } from '@app/_components/control-messages/control-messages.component';
import { InputComponent } from '@app/_components/input/input.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '@app/_components/alert.component';

import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [
    BreadcumbComponent,ControlMessagesComponent,InputComponent, AlertComponent
  ],
  imports: [
    FormsModule, ReactiveFormsModule,  CommonModule, NgxMaskModule.forRoot()
  ],
  providers: [
  ],
  exports:[ BreadcumbComponent, ControlMessagesComponent, InputComponent, FormsModule, ReactiveFormsModule,  CommonModule, NgxMaskModule, AlertComponent]
})
export class SharedModule { }
