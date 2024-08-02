import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CompanyService } from '../../../services/company.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CompaniesFormComponent } from '../companies-form/companies-form.component';
import { CommonTableComponent } from '../../../shared/components/common-table/common-table.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { AntDesignModule } from '../../../shared/modules/ant-design.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-companies-list',
  standalone: true,
  imports: [CommonTableComponent, CompaniesFormComponent,SearchInputComponent, AntDesignModule, RouterModule],
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.scss'
})
export class CompaniesListComponent {

  companyList: any[] = []
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
      title: 'Type',
      key: 'type',
      compare: (a: any, b: any) => a.type.localeCompare(b.type),
      priority: 2
    },
    {
      title: 'Mobile',
      key: 'phone',
      compare: (a: any, b: any) => a.phone - b.phone,
      priority: 1
    },
    {
      title: 'Action',
      key: 'actions',
      buttons: this.actions,
      priority: 0
    }
  ];

  constructor(private companyService: CompanyService,
    private modal: NzModalService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.getCompanyList();
  }

  // company list 
  getCompanyList() {
    this.companyService.getCompanys().subscribe(result => {
      if (result.success) {
        this.companyList = result.data;
        this.filterData = result.data;
      }
    })
  }

  // create page 
  createEditCompany(data?: any): void {
    const modal = this.modal.create({
      nzTitle: `${data?.type || 'Create'} Company`,
      nzContent: CompaniesFormComponent,
      nzFooter: null,
      nzCentered: true,
      nzData: data
    });
    modal.afterClose.subscribe((data) => {
      if (data && data.success) {
        this.getCompanyList();
      }
    });
  }

  // delete Company 
  deleteCompany(company: any) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete this company?',
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.companyService.deleteCompany(company._id).subscribe(
            result => {
              if (result.success) {
                this.message.create('success', result.data);
                this.getCompanyList();
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
      this.deleteCompany(event.data);
    } else if (event.action === 'Edit' || event.action === 'View') {
      const editData = { id: event.data._id, type: event.action }
      this.createEditCompany(editData);
    }
  }

  // filter table data 
  filterList(event: string) {
    this.filterData = this.companyList.filter(item => {
      return this.listOfColumn.some(column => {
        if (item[column.key]) {
          return item[column.key].toString().toLowerCase().includes(event.toLowerCase());
        }
        return false;
      });
    });
  }
}
