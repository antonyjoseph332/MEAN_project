import { Component } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { CommonTableComponent } from '../../../shared/components/common-table/common-table.component';
import { UserFormComponent } from '../../users/user-form/user-form.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { AntDesignModule } from '../../../shared/modules/ant-design.module';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonTableComponent, UserFormComponent, SearchInputComponent, AntDesignModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent {

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
      key: 'article',
      compare: (a: any, b: any) => a.article.localeCompare(b.article),
      priority: false
    },
   
    {
      title: 'Price',
      key: 'price',
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

  constructor(private userService: ArticleService,
    private modal: NzModalService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.getArticleList();
  }

  // user list 
  getArticleList() {
    this.userService.getArticles().subscribe(result => {
      if (result.success) {
        this.userList = result.data;
        this.filterData = result.data;
      }
    })
  }

  // create page 
  createEditArticle(data?: any): void {
    const modal = this.modal.create({
      nzTitle: `${data?.type || 'Create'} Article`,
      nzContent: ArticleFormComponent,
      nzFooter: null,
      nzCentered: true,
      nzData: data
    });
    modal.afterClose.subscribe((data) => {
      if (data && data.success) {
        this.getArticleList();
      }
    });
  }

  // delete Article 
  deleteArticle(user: any) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete this user?',
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.userService.deleteArticle(user._id).subscribe(
            result => {
              if (result.success) {
                this.message.create('success', result.data);
                this.getArticleList();
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
      this.deleteArticle(event.data);
    } else if (event.action === 'Edit' || event.action === 'View') {
      const editData = { id: event.data._id, type: event.action }
      this.createEditArticle(editData);
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
