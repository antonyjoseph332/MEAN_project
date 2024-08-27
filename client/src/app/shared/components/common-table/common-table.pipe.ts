import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commonTable',
  standalone: true
})
export class CommonTablePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) { }

  transform(value: any, column?: any, properties?: any): any {
    if (column.dataType === 'tag') {
      return properties[column.key][value];
    }
    else if (column.dataType === 'pipe') {
      if (properties[column.key] === 'date') {
        return this.datePipe.transform(value)
      } else {
        return value
      }
    }
    else {
      return value;
    }
  }

}
