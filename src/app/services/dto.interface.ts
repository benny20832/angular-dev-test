import { OptionEnum } from '../components/wizard/upgrades-wiz/upgrades-model';
import { NullableType } from '../util/nullableType';

// TODO: specify the interface for the DTO object, that you use for storing and loading data.
export interface Dto {
  personalData: PersonalData;
  invoiceData: InvoiceData;
  upgrades: NullableType<OptionEnum>;
}

export interface PersonalData {
  firstName: string;
  lastName: string;
  transferToInvoice: boolean;
}

export interface InvoiceData {
  firstName: string;
  lastName: string;
  company: string;
  street: string;
  zipCode: string;
  city: string;
}

export interface Upgrades<T> {
  name: string;
  value: T;
}
