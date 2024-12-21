import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Dto } from '../../services/dto.interface';
import { NullableType } from '../../util/nullableType';
import { OptionsPipe } from '../../util/options.pipe';

@Component({
  selector: 'order-list',
  standalone: true,
  imports: [OptionsPipe, AsyncPipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  apiService = inject(ApiService);
  orderData$: Observable<Array<Dto>> = from(this.apiService.load())
}
