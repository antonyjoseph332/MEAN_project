import { CommonModule, DatePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { AntDesignModule } from '../../modules/ant-design.module';
import { CommonTablePipe } from './common-table.pipe';

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [CommonModule, AntDesignModule, CommonTablePipe],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export class CommonTableComponent {

  @Input('data') listData: any[] = []
  @Input('columns') listColumns: any[] = []
  @Input('properties') properties: any;
  @Output('action') action: EventEmitter<any> = new EventEmitter

  actionControl(data: any, action: string) {
    this.action.emit({ data, action });
  }

}
