import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InvoiceData, PersonalData } from '../../../services/dto.interface';
import { NullableType } from '../../../util/nullableType';
import { OptionEnum, OptionsList } from '../upgrades-wiz/upgrades-model';

@Component({
  selector: 'order-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview-wiz.component.html',
  styleUrl: '../wizard.component.scss',
})
export class OrderOverviewComponent implements OnInit {
  @Input() personalData: NullableType<PersonalData> = null;
  @Input() invoiceData: NullableType<InvoiceData> = null;
  @Input() upgradeData: NullableType<OptionEnum> = null;
  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();
  bookedOption = '';

  ngOnInit(): void {
    if (this.upgradeData) {
      this.bookedOption = OptionsList[this.upgradeData].name;
    } else {
      this.bookedOption = OptionsList[0].name;
    }
  }

  next(): void {
    this.nextStep.emit();
  }

  goBack(): void {
    this.prevStep.emit();
  }
}
