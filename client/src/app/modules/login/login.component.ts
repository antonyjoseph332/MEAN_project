import { Component } from '@angular/core';
import { AntDesignModule } from '../../shared/modules/ant-design.module';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AntDesignModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isLoading: boolean = false;

  constructor(private fb: NonNullableFormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private message: NzMessageService,
    private route: Router
  ) { }

  validateForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true
      this.userService.loginUser(this.validateForm.value).subscribe(result => {
        if (result && result.success) {
          this.authService.setToken(result.token);
          this.route.navigateByUrl('user')
        } else {
          this.message.create('error', result.message);
        }
        this.isLoading = false;
      })

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
