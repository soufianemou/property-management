import { AxiosError } from "axios";

export interface IConnectionInput {
  name: "username" | "password";
  placeholder: string;
  type: string;
}

export interface IPropertyInput {
  name: "name" | "address" | "units" | "rental_cost";
  placeholder: string;
  type: string;
}

export interface ITenantInput {
  name: "name" | "telephone" | "section";
  placeholder: string;
  type: string;
}

export interface IPayementInput {
  name: "amount" | "date";
  placeholder: string;
  type: string;
}

export interface ILoginPayload {
  refresh: string;
  access: string;
}

export interface IProperty {
  id: string;
  name: string;
  address: string;
  type: string;
  units: number;
  rental_cost: number;
  created_at: Date;
  updated_at: Date;
}
export interface IPropertyPayload {
  properties: IProperty[];
  total: number;
}

export interface ITenants {
  id: string;
  name: string;
  telephone: string;
  section: string;
  property: number | string;
  property_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface ITenantsPayload {
  tenants: ITenants[];
  total: number;
}

export interface IPayementInfo {
  id: string;
  tenant: number | string;
  tenant_name: string;
  amount: number;
  property_name: string;
  date: string;
  is_settled: boolean;
}

export interface IPayementInfoPayload {
  payments: IPayementInfo[];
  total: number;
}

export interface IErrorResponse {
  error?: {
    message?: string;
  };
  message?: string;
  detail?: string;
}

export interface CustomAxiosError<T> extends AxiosError<T> {
  data?: T;
}
