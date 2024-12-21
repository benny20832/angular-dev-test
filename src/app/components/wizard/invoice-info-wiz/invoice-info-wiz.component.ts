import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NullableType } from '../../../util/nullableType';
import { InvoiceData } from '../../../services/dto.interface';
import { InvoiceForm } from '../../../util/types';

@Component({
  selector: 'invoice-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invoice-info-wiz.component.html',
  styleUrl: '../wizard.component.scss',
})
export class InvoiceInfoWizardComponent implements OnInit {
  @Input() data: NullableType<InvoiceData> = null;
  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();
  @Output() switchStep = new EventEmitter<InvoiceData>();
  formGroup = new FormGroup(<InvoiceForm>{
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    company: new FormControl(''),
    street: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // set data when coming back from next step
    if (this.data) {
      this.formGroup.patchValue(this.data);
    }

    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (): void => {
          const data: InvoiceData = this.formGroup.getRawValue();
          this.switchStep.emit(data);
        },
      });
  }

  public next(): void {
    console.log(this.data);
    if (this.formGroup.valid) {
      this.nextStep.emit();
    }
  }

  public goBack(): void {
    this.prevStep.emit();
  }
}
