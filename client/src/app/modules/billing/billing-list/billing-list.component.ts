import { Component } from '@angular/core';
import { CommonTableComponent } from '../../../shared/components/common-table/common-table.component';
import { AntDesignModule } from '../../../shared/modules/ant-design.module';
import { Router, RouterModule } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BillService } from '../../../services/bill.service';

@Component({
  selector: 'app-billing-list',
  standalone: true,
  imports: [CommonTableComponent, AntDesignModule, RouterModule],
  templateUrl: './billing-list.component.html',
  styleUrl: './billing-list.component.scss'
})
export class BillingListComponent {

  billList: any[] = []
  filterData: any[] = []
  confirmModal?: NzModalRef;

  actions = [
    { action: 'View', icon: 'eye' },
    { action: 'Delete', icon: 'delete' },
  ]

  listOfColumn = [
    {
      title: 'Order Date',
      key: 'orderDate',
      dataType: 'pipe',
      compare: (a: any, b: any) => a.name.localeCompare(b.name),
      priority: false
    },
    {
      title: 'Delivery Date',
      key: 'deliveryDate',
      dataType: 'pipe',
      compare: (a: any, b: any) => a.name.localeCompare(b.name),
      priority: false
    },
    {
      title: 'Status',
      key: 'itemStatus',
      dataType: 'tag',
      compare: (a: any, b: any) => a.type.localeCompare(b.type),
      priority: 2
    },
    {
      title: 'Payment Status',
      key: 'paidStatus',
      dataType: 'tag',
      compare: (a: any, b: any) => a.phone - b.phone,
      priority: 1
    },
    {
      title: 'Total Amount',
      key: 'totalAmount',
      compare: (a: any, b: any) => a.phone - b.phone,
      priority: 1
    },
    {
      title: 'Paid Amount',
      key: 'paidAmount',
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

  tableProperties = {
    orderDate: 'date',
    deliveryDate: 'date',
    paidStatus: {
      Paid: 'green',
      Unpaid: 'red',
      Parttialy: 'blue',
    },
    itemStatus: {
      Closed: 'green',
      Opened: 'blue',
    }
  }

  constructor(private billService: BillService,
    private modal: NzModalService,
    private route: Router,
    private message: NzMessageService) { }

  ngOnInit() {
    this.getBillList();
  }

  // bill list 
  getBillList() {
    this.billService.getBills().subscribe(result => {
      if (result.success) {
        this.billList = result.data;
        this.filterData = result.data;
      }
    })
  }

  // delete Bill 
  deleteBill(bill: any) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete this bill?',
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.billService.deleteBill(bill._id).subscribe(
            result => {
              if (result.success) {
                this.message.create('success', result.data);
                this.getBillList();
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
    console.log(event);
    
    if (event.action === 'Delete') {
      this.deleteBill(event.data);
    } else if (event.action === 'View') {
      this.route.navigateByUrl(`/billing/edit/${event.data._id}`)
    }
  }

  createEditBill() {
    this.route.navigateByUrl('/billing/create')
  }

}
