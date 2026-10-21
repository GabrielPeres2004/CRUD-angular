import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Customer, CustomerRequest } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/customers`;

  findAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }

  findById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/${id}`);
  }

  create(data: CustomerRequest): Observable<Customer> {
    return this.http.post<Customer>(this.url, data);
  }

  update(id: number, data: CustomerRequest): Observable<Customer> {
    return this.http.put<Customer>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
