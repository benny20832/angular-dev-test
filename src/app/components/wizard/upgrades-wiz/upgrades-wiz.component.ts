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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PersonalData } from '../../../services/dto.interface';
import { NullableType } from '../../../util/nullableType';
import { OptionEnum, OptionsList } from './upgrades-model';

@Component({
  selector: 'upgrades-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './upgrades-wiz.component.html',
  styleUrl: '../wizard.component.scss',
})
export class UpgradesWizardComponent implements OnInit {
  @Input() data: NullableType<OptionEnum> = null;
  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<PersonalData>();
  @Output() optionChange = new EventEmitter<NullableType<OptionEnum>>();
  radioControl = new FormControl<NullableType<OptionEnum>>(null, []);
  private destroyRef = inject(DestroyRef);
  ticketOptions = OptionsList;

  ngOnInit(): void {
    this.radioControl.setValue(this.data);
    this.radioControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value: NullableType<OptionEnum>): void => {
          this.optionChange.emit(value);
        },
      });
  }

  public next(): void {
    this.nextStep.emit();
  }

  public goBack(): void {
    this.prevStep.emit();
  }
}
