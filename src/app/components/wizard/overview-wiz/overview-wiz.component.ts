import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InvoiceData, PersonalData } from '../../../services/dto.interface';
import { NullableType } from '../../../util/nullableType';

@Component({
  selector: 'order-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview-wiz.component.html',
  styleUrl: '../wizard.component.scss',
})
export class OrderOverviewComponent {
  @Input() personalData: NullableType<PersonalData> = null;
  @Input() invoiceData: NullableType<InvoiceData> = null;
  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();

  next(): void {
    this.nextStep.emit();
  }

  goBack(): void {
    this.prevStep.emit();
  }
}
