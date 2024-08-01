import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AntDesignModule } from '../../shared/modules/ant-design.module';
import { AuthService } from '../../core/auth.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AntDesignModule, CommonModule, RouterOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isCollapsed = false;
  loginUser: any

  routers = [
    { route: '/companies', header: 'Companies', icon: 'appstore' },
    { route: '/article', header: 'Articles', icon: 'audit' },
    { route: '/user', header: 'Users', icon: 'user' },
  ]
  currentRoute: any;

  constructor(private authService: AuthService,
    private modal: NzModalService,
    private route: Router) { }

  ngOnInit() {
    this.loginUser = this.authService.getUser();
    this.currentRoute = this.routers.find(r => this.route.url.includes(r.route))
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.routers.find(r => this.route.url.includes(r.route))
      }
    });
  }



  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  signOut() {
    this.modal.confirm({
      nzTitle: 'Do you want to sign out?',
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.authService.removeToken();
            resolve();
          }, 1000)
        });
      }
    });
  }
}
