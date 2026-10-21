export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface FieldError {
  field: string;
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  timestamp?: string;
  errors?: FieldError[];
}
