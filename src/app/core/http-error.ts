import { HttpErrorResponse } from '@angular/common/http';

import { ApiError } from '../models/customer.model';

export function getApiError(error: unknown): ApiError | null {
  if (error instanceof HttpErrorResponse && error.error && typeof error.error === 'object') {
    return error.error as ApiError;
  }
  return null;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse && error.status === 0) {
    return 'Não foi possível conectar ao servidor. Verifique se a API está rodando.';
  }
  return getApiError(error)?.message ?? 'Ocorreu um erro inesperado. Tente novamente.';
}
