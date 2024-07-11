import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NzTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {

  constructor() { }

  ngOnInit() {
  }

}

