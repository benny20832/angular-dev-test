import { FormControl } from '@angular/forms';
import { InvoiceData, PersonalData } from '../services/dto.interface';

export type PersonalDataForm = Record<keyof PersonalData, FormControl>;
export type InvoiceForm = Record<keyof InvoiceData, FormControl>;
