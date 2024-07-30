import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AntDesignModule } from '../../shared/modules/ant-design.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AntDesignModule, RouterOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
