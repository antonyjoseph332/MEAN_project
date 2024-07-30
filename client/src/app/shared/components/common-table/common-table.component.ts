import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, NzIconModule],
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
