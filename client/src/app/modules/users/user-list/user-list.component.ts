import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonTableComponent } from '../../../shared/components/common-table/common-table.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AntDesignModule } from '../../../shared/modules/ant-design.module';
import { Router, RouterModule } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonTableComponent, UserFormComponent, SearchInputComponent, AntDesignModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  userList: any[] = []
  filterData: any[] = []
  confirmModal?: NzModalRef;

  actions = [
    { action: 'View', icon: 'eye' },
    { action: 'Edit', icon: 'edit' },
    { action: 'Delete', icon: 'delete' },
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

  constructor(private userService: UserService,
    private modal: NzModalService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.getUserList();
  }

  // user list 
  getUserList() {
    this.userService.getUsers().subscribe(result => {
      if (result.success) {
        this.userList = result.data;
        this.filterData = result.data;
      }
    })
  }

  // create page 
  createEditUser(data?: any): void {
    const modal = this.modal.create({
      nzTitle: `${data?.type || 'Create'} User`,
      nzContent: UserFormComponent,
      nzFooter: null,
      nzCentered: true,
      nzData: data
    });
    modal.afterClose.subscribe((data) => {
      if (data && data.success) {
        this.getUserList();
      }
    });
  }

  // delete User 
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

  // table actions 
  actionControl(event: any) {
    if (event.action === 'Delete') {
      this.deleteUser(event.data);
    } else if (event.action === 'Edit' || event.action === 'View') {
      const editData = { id: event.data._id, type: event.action }
      this.createEditUser(editData);
    }
  }

  // filter table data 
  filterList(event: string) {
    this.filterData = this.userList.filter(item => {
      return this.listOfColumn.some(column => {
        if (item[column.key]) {
          return item[column.key].toString().toLowerCase().includes(event.toLowerCase());
        }
        return false;
      });
    });
  }

}
