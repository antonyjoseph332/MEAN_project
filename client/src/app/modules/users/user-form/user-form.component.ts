import { Component, ViewChild, ViewChildren } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Validators } from '@angular/forms';
import { CommonFormComponent } from '../../../shared/components/common-form/common-form.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonFormComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  modalData: any;
  @ViewChild(CommonFormComponent) formComponent!: CommonFormComponent;

  constructor(private userService: UserService,
    private message: NzMessageService,
    private modalRef: NzModalRef<UserFormComponent>) { }

  userForm = {
    config: [
      { name: 'name', label: 'Name', type: 'input', validators: [Validators.required] },
      { name: 'email', label: 'Email', type: 'input', validators: [Validators.required] },
      { name: 'password', label: 'Password', type: 'input', inputType: 'password', validators: [Validators.required] },
      { name: 'mobile', label: 'Mobile', type: 'input', validators: [Validators.required] },
      { name: 'dob', label: 'Date of Birth', type: 'date', validators: [Validators.required] },
      { name: 'description', label: 'Description', type: 'textbox' },
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
    this.userService.getUserById(this.modalData.id).subscribe(result => {
      if (result && result.success) {
        this.formComponent.form.patchValue(result.data);
        if (this.modalData.type === 'View') {
          this.formComponent.form.disable();
          this.userForm.hideButton = true;
        }
      }
    })
  }

  // crate user 
  onSubmitForm(ev: any) {
    if (this.modalData.type === 'Edit') {
      this.userService.updateUser(ev,this.modalData.id).subscribe(result => {
        if (result.success) {
          this.message.create('success', 'User edit successfully!');
          this.modalRef.close({ success: true, data: ev });
        } else {
          this.message.create('error', result.message);
        }
      })
    } else {
      this.userService.createUser(ev).subscribe(result => {
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
