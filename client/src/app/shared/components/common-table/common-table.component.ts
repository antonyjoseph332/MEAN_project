import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { AntDesignModule } from '../../modules/ant-design.module';

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [CommonModule, AntDesignModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export class CommonTableComponent {

  @Input('data') listData: any[] = []
  @Input('columns') listColumns: any[] = []
  @Output('action') action: EventEmitter<any> = new EventEmitter

  actionControl(data: any, action: string) {
    this.action.emit({ data, action });
  }

}
