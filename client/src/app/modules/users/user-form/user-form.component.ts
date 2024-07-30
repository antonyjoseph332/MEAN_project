import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Validators } from '@angular/forms';
import { CommonFormComponent } from '../../../shared/components/common-form/common-form.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonFormComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  constructor(private userService: UserService, private message: NzMessageService) { }

  articleForm = {
    config: [
      { name: 'name', label: 'Name', type: 'input', validators: [Validators.required] },
      { name: 'email', label: 'Email', type: 'input', validators: [Validators.required] },
      { name: 'password', label: 'Password', type: 'input', inputType: 'password', validators: [Validators.required] },
      { name: 'mobile', label: 'Mobile', type: 'input', validators: [Validators.required] },
      { name: 'description', label: 'Description', type: 'textbox' },
      { name: 'dob', label: 'Date of Birth', type: 'date', validators: [Validators.required] },

    ],
    submitButton: 'Submit',
    resetButton: 'Clear'
  }

  onSubmitForm(ev: any) {
    this.userService.createUser(ev).subscribe(result => {
      console.log(result);

      if (result.success) {
        this.message.create('success', result.data);
      }

    })
  }
}
