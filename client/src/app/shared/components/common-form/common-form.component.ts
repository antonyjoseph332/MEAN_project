import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-common-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzIconModule, NzButtonModule],
  templateUrl: './common-form.component.html',
  styleUrl: './common-form.component.scss'
})
export class CommonFormComponent {

  @Input('form') formConfig: any
  form!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const formGroup: any = {}
    this.formConfig.config.forEach((control: any) => {
      formGroup[control.name] = [control.value || '', control.validators || []]
    });
    this.form = this.fb.group(formGroup);


    // this.validateForm = this.fb.group({
    //   userName: ['', [Validators.required]],
    //   password: ['', [Validators.required]],
    //   remember: [true]
    // })
  }

  submitForm() {
    console.log(this.form.value)
  }

}
