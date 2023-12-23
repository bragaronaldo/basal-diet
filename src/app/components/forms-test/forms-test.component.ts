import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-forms-test',
  templateUrl: './forms-test.component.html',
  styleUrls: ['./forms-test.component.scss'],
})
export class FormsTestComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    });
  }

  get formControls() {
    return this.userForm.controls;
  }

  submit() {

    if(!this.userForm.touched) {
      console.log('O formulário não foi tocado!');
      return;

    }

    if (this.userForm.invalid) {
      return;
    }
    console.log('Enviou formulário');
  }
}
