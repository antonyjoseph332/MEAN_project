import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AntDesignModule } from '../../modules/ant-design.module';

@Component({
  selector: 'app-common-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AntDesignModule],
  templateUrl: './common-form.component.html',
  styleUrl: './common-form.component.scss'
})
export class CommonFormComponent {

  @Input('form') formConfig: any;
  @Input('filterOptions') filterOptions: any;
  @Output('formSubmit') formSubmit: EventEmitter<any> = new EventEmitter();
  form!: FormGroup
  filteredOptions: any[] = [];

  constructor(private fb: FormBuilder) {
  }

  compareFun = (o1: any | string, o2: any): boolean => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };

  onChange(filterKey: string, value: string): void {
    this.filteredOptions = this.filterOptions[filterKey].filter((option: any) => option.label.toLowerCase().includes(value.toLowerCase()));
  }

  setFilterOptions(filterKey: string) {
    this.filteredOptions = this.filterOptions[filterKey]
  }


  ngOnInit() {
    const formGroup: any = {}
    this.formConfig.config.forEach((control: any) => {
      formGroup[control.name] = [control.value || '', control.validators || []]
    });
    this.form = this.fb.group(formGroup);
  }

  isControlRequired(controlName: string): boolean {
    const control = this.form.get(controlName);
    if (!control) return false;
    const validator = control.validator ? control.validator({} as any) : null;
    return validator ? !!validator['required'] : false;
  }

  submitForm() {
    this.formSubmit.emit(this.form.value);
  }

}
