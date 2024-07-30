import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonTableComponent } from '../../../shared/components/common-table/common-table.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AntDesignModule } from '../../../shared/modules/ant-design.module';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonTableComponent, AntDesignModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  userList: any[] = []
  confirmModal?: NzModalRef;

  actions = [
    { action: 'delete', icon: 'delete' },
    { action: 'edit', icon: 'edit' },
  ]

  listOfColumn = [
    {
      title: 'Name',
      key: 'name',
      compare: (a: any, b: any) => a.name.localeCompare(b.name),
      priority: false
    },
    {
      title: 'Email',
      key: 'email',
      compare: (a: any, b: any) => a.email.localeCompare(b.email),
      priority: 2
    },
    {
      title: 'Mobile',
      key: 'mobile',
      compare: (a: any, b: any) => a.mobile - b.mobile,
      priority: 1
    },
    {
      title: 'Action',
      key: 'actions',
      buttons: this.actions,
      priority: 0
    }
  ];

  constructor(private userService: UserService, private modal: NzModalService, private message: NzMessageService, private router:Router) { }

  ngOnInit() {
    this.getUserList();
  }

  addUser(){
    this.router.navigateByUrl('/form')
  }

  getUserList() {
    this.userService.getUsers().subscribe(result => {
      if (result.success) {
        this.userList = result.data;
      }
    })
  }

  deleteUser(user: any) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete this user?',
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.userService.deleteUser(user._id).subscribe(
            result => {
              if (result.success) {
                this.message.create('success', result.data);
                this.getUserList();
              } else {
                this.message.create('error', result.data);
              }
              resolve(result);
            },
            err => {
              reject(err);
            }
          );
        });
      }
    });
  }

  actionControl(event: any) {
    if (event.action === 'delete') {
      this.deleteUser(event.data);
    }
  }

}
