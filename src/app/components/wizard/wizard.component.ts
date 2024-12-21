import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { InvoiceData, PersonalData } from '../../services/dto.interface';
import { NullableType } from '../../util/nullableType';
import { InvoiceInfoWizardComponent } from './invoice-info-wiz/invoice-info-wiz.component';
import { OrderOverviewComponent } from './overview-wiz/overview-wiz.component';
import { PersonInfoWizardComponent } from './person-info-wiz/person-info-wiz.component';
import { Steps } from './wizard-steps.enum';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [
    PersonInfoWizardComponent,
    InvoiceInfoWizardComponent,
    OrderOverviewComponent,
  ],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss',
})
export class WizardComponent {
  private apiService = inject(ApiService);
  actualStep = Steps.PersonInfoWizardComponent;
  protected wizardSteps = Steps;
  personalInfo: NullableType<PersonalData> = null;
  invoiceInfo: NullableType<InvoiceData> = null;

  setWizardStep(step: Steps): void {
    this.actualStep = step;
  }

  setPersonalInfo(data: NullableType<PersonalData>) {
    this.personalInfo = data;
  }

  setInvoiceInfo(data: NullableType<InvoiceData>) {
    this.invoiceInfo = data;
  }

  submitData(): void {
    this.storeData();
    this.cleanup();
  }

  private storeData(): void {
    if (this.personalInfo && this.invoiceInfo) {
      this.apiService.store({
        personalData: this.personalInfo,
        invoiceData: this.invoiceInfo,
      });
    }
  }

  private cleanup(): void {
    alert('Bestellung erfolgreich abgeschlossen');
    this.setWizardStep(Steps.PersonInfoWizardComponent);
    this.setPersonalInfo(null);
    this.setInvoiceInfo(null);
  }
}
