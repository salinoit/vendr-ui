import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.css']
})
export class FinalizeComponent implements OnInit {
  checkoutForm: FormGroup;
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder
    )
    {
      this.submitted = false;
    }

  get f() { return this.checkoutForm.controls; }
  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      nome: ['', Validators.required],
    });

  }
  onSubmit()
  {
    this.submitted = true;
  }
}
