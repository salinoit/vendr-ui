import { FormControlName } from '@angular/forms';
import { Component, Input, forwardRef, AfterViewInit, 
  HostListener, OnChanges, ViewEncapsulation, ViewChild,OnInit, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class InputComponent implements OnInit , ControlValueAccessor {
  
  @Input("id")
  id:String;

  @Input()
  placeholder:String;

  constructor() { }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    //this.innerValue = value;
}

//From ControlValueAccessor interface
registerOnChange(fn: any) {
    //this.propagateChange = fn;
}

//From ControlValueAccessor interface
registerOnTouched(fn: any) {

}

  ngOnInit() {
  }

}
