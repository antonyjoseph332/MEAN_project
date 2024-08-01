import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AntDesignModule } from '../../shared/modules/ant-design.module';
import { AuthService } from '../../core/auth.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AntDesignModule, RouterOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isCollapsed = false;
  loginUser: any

  constructor(private authService: AuthService,
    private modal: NzModalService,
    private route: Router) { }

  ngOnInit() {
    this.loginUser = this.authService.getUser();
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  signOut() {
    this.modal.confirm({
      nzTitle: 'Do you want to sign out?',
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.authService.removeToken();
          setTimeout(() => {
            this.route.navigateByUrl('login');
            resolve();
          }, 1000)
        });
      }
    });
  }
}
