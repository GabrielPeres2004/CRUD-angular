import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { getErrorMessage } from '../../core/http-error';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  imports: [RouterLink],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
})
export class CustomerList implements OnInit {
  private readonly customerService = inject(CustomerService);

  protected readonly customers = signal<Customer[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly search = signal('');

  protected readonly filteredCustomers = computed(() => {
    const term = this.search().trim().toLowerCase();
    if (!term) {
      return this.customers();
    }
    return this.customers().filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.phone.includes(term),
    );
  });

  ngOnInit(): void {
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.error.set(null);

    this.customerService.findAll().subscribe({
      next: (customers) => {
        this.customers.set(customers);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(getErrorMessage(err));
        this.loading.set(false);
      },
    });
  }

  protected onSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  protected remove(customer: Customer): void {
    if (!confirm(`Deseja realmente excluir o cliente "${customer.name}"?`)) {
      return;
    }

    this.error.set(null);
    this.customerService.delete(customer.id).subscribe({
      next: () => this.customers.update((list) => list.filter((c) => c.id !== customer.id)),
      error: (err) => this.error.set(getErrorMessage(err)),
    });
  }
}
