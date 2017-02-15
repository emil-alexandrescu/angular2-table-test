import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SortParam } from '../../model/table/sortParam';
import { Customer } from '../../model/customer/customer';

@Injectable()
export class ApiService {
  constructor(private http: Http) {}

  /**
   * Fetches customer list
   * @param SortParam sort
   * @param string filter
   * @returns Observable<Customer[]>
   */
  getCustomers(sort: SortParam = {}, filter = ''): Observable<Customer[]> {
    const params: URLSearchParams = new URLSearchParams();
    Object.keys(sort).forEach((sortKey: string) => {
      params.set(`sort[${sortKey}]`, sort[sortKey]);
    });
    params.set('filter', filter);

    return this.http.get(`http://localhost:3000/customers`, {
      search: params
    })
    .map((res: Response) => res.json());
  }
}
