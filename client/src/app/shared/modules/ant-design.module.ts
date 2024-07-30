import { NgModule } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [],
  imports: [
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzMessageModule,
    NzMenuModule,
    NzToolTipModule,
    NzFlexModule,
    NzLayoutModule,
    NzDatePickerModule,
    NzGridModule
  ],
  exports: [
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzMessageModule,
    NzMenuModule,
    NzToolTipModule,
    NzFlexModule,
    NzLayoutModule,
    NzDatePickerModule,
    NzGridModule
  ]
})
export class AntDesignModule { }
