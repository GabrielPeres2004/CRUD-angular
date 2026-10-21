import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { getApiError, getErrorMessage } from '../../core/http-error';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly customerService = inject(CustomerService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly customerId = signal<number | null>(null);
  protected readonly isEdit = computed(() => this.customerId() !== null);
  protected readonly loading = signal(false);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: [''],
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }

    this.customerId.set(Number(idParam));
    this.loading.set(true);

    this.customerService.findById(Number(idParam)).subscribe({
      next: (customer) => {
        this.form.patchValue({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address ?? '',
        });
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(getErrorMessage(err));
        this.loading.set(false);
      },
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    const data = this.form.getRawValue();
    const id = this.customerId();
    const request$ =
      id === null ? this.customerService.create(data) : this.customerService.update(id, data);

    request$.subscribe({
      next: () => this.router.navigate(['/customers']),
      error: (err) => {
        this.handleError(err);
        this.saving.set(false);
      },
    });
  }

  protected fieldError(field: 'name' | 'email' | 'phone'): string | null {
    const control = this.form.controls[field];
    if (!control.touched || !control.errors) {
      return null;
    }
    if (control.errors['server']) {
      return control.errors['server'];
    }
    if (control.errors['required']) {
      return field === 'name'
        ? 'Nome é obrigatório'
        : field === 'email'
          ? 'Email é obrigatório'
          : 'Telefone é obrigatório';
    }
    if (control.errors['email']) {
      return 'Email inválido';
    }
    return null;
  }

  // Erros de validação do back-end (422) são exibidos no campo correspondente.
  private handleError(err: unknown): void {
    const apiError = getApiError(err);

    if (err instanceof HttpErrorResponse && err.status === 422 && apiError?.errors) {
      for (const { field, message } of apiError.errors) {
        const control = this.form.get(field);
        control?.setErrors({ server: message });
        control?.markAsTouched();
      }
      return;
    }

    this.error.set(getErrorMessage(err));
  }
}
