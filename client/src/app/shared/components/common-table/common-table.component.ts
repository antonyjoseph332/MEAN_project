import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [CommonModule, NzTableModule],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export class CommonTableComponent {

  @Input('data') listData: any[] = []
  @Input('columns') listColumns: any[] = []



}
