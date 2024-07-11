import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonTableComponent } from '../../../shared/components/common-table/common-table.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonTableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  userList: any[] = []

  listOfColumn = [
    {
      title: 'Name',
      key: 'username',
      compare: (a: any, b: any) => a.username - b.username,
      priority: false
    },
    {
      title: 'Email',
      key: 'email',
      compare: (a: any, b: any) => a.email - b.email,
      priority: 0
    },
    {
      title: 'Mobile',
      key: 'mobile',
      compare: (a: any, b: any) => a.mobile - b.mobile,
      priority: 0
    },
  ];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUsers().subscribe(result => {
      if (result.success) {
        this.userList = result.data;
      }
    })
  }
}
