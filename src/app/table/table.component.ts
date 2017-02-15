import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Row } from '../../model/table/row';
import { Column } from '../../model/table/column';

@Component({
  selector: 'my-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() rows: Array<Row> = [];
  @Input() columns: Array<Column> = [];

  @Output() sort: EventEmitter<number> = new EventEmitter();

  sortColumn(colIndex) {
    this.sort.emit(colIndex);
  }
}
