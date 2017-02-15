import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../shared/api.service';
import { SortParam } from '../../model/table/sortParam';
import { Column } from '../../model/table/column';
import { Customer } from '../../model/customer/customer';

const sortMap = {
  asc: 'desc',
  desc: undefined
};

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public customers: Observable<Array<Customer>>;
  public filter = '';
  public columns: Array<Column>;

  constructor(private service: ApiService) {
    this.columns = [{
      id: 'id',
      title: 'id'
    }, {
      id: 'name',
      title: 'name'
    }, {
      id: 'position',
      title: 'position'
    }];
    this.getCustomers();
  }

  getCustomers() {
    const sortParam: SortParam = {};
    this.columns.forEach((col: Column) => {
      if (col.sort) {
        sortParam[col.id] = col.sort;
      }
    });
    this.customers = this.service.getCustomers(sortParam, this.filter);
  }

  sort(colIndex) {
    this.columns[colIndex].sort = !this.columns[colIndex].sort ? 'asc' : sortMap[this.columns[colIndex].sort];
    this.getCustomers();
  }

  search() {
    this.getCustomers();
  }
}
