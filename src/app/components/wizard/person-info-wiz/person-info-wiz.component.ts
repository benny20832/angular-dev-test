import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PersonalData } from '../../../services/dto.interface';
import { NullableType } from '../../../util/nullableType';
import { PersonalDataForm } from '../../../util/types';

@Component({
  selector: 'personal-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './person-info-wiz.component.html',
  styleUrl: '../wizard.component.scss',
})
export class PersonInfoWizardComponent implements OnInit {
  @Input() data: NullableType<PersonalData> = null;
  @Output() nextStep = new EventEmitter<void>();
  @Output() switchStep = new EventEmitter<PersonalData>();
  formGroup = new FormGroup(<PersonalDataForm>{
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    transferToInvoice: new FormControl(false, []),

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
          const data: PersonalData = this.formGroup.getRawValue();
          this.switchStep.emit(data);
        },
      });
  }

  public next() {
    if (this.formGroup.valid) {
      this.nextStep.emit();
    }
  }
}
