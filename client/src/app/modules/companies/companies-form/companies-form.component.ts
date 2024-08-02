import { Component, ViewChild } from '@angular/core';
import { CommonFormComponent } from '../../../shared/components/common-form/common-form.component';
import { CompanyService } from '../../../services/company.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-companies-form',
  standalone: true,
  imports: [CommonFormComponent],
  templateUrl: './companies-form.component.html',
  styleUrl: './companies-form.component.scss'
})
export class CompaniesFormComponent {
  modalData: any;
  @ViewChild(CommonFormComponent) formComponent!: CommonFormComponent;

  constructor(private companyService: CompanyService,
    private message: NzMessageService,
    private modalRef: NzModalRef<CompaniesFormComponent>) { }

  userForm = {
    config: [
      { name: 'name', label: 'Name', type: 'input', validators: [Validators.required] },
      { name: 'type', label: 'Type', type: 'input', validators: [Validators.required] },
      { name: 'address', label: 'Address', type: 'input', validators: [Validators.required] },
      { name: 'phone', label: 'Phone', type: 'input', validators: [Validators.required] },
    ],
    submitButton: 'Submit',
    resetButton: 'Clear',
    hideButton: false
  }

  ngOnInit() {
    this.modalData = this.modalRef.getConfig().nzData
    if (this.modalData && this.modalData.id) {
      this.userForm.config = this.userForm.config.filter(c => c.name !== 'password')
      this.getUser();
    }
  }

  // get user by id 
  getUser() {
    this.companyService.getCompanyById(this.modalData.id).subscribe(result => {
      if (result && result.success) {
        this.formComponent.form.patchValue(result.data);
        if (this.modalData?.type === 'View') {
          this.formComponent.form.disable();
          this.userForm.hideButton = true;
        }
      }
    })
  }

  // crate user 
  onSubmitForm(ev: any) {
    if (this.modalData?.type === 'Edit') {
      this.companyService.updateCompany(ev, this.modalData.id).subscribe(result => {
        if (result.success) {
          this.message.create('success', 'User edit successfully!');
          this.modalRef.close({ success: true, data: ev });
        } else {
          this.message.create('error', result.message);
        }
      })
    } else {
      this.companyService.createCompany(ev).subscribe(result => {
        if (result.success) {
          this.message.create('success', 'User created successfully!');
          this.modalRef.close({ success: true, data: ev });
        } else {
          this.message.create('error', result.message);
        }
      })
    }
  }
}
