import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { from, take } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Dto } from '../../services/dto.interface';
import { OptionsPipe } from '../../util/options.pipe';

@Component({
  selector: 'order-list',
  standalone: true,
  imports: [OptionsPipe, AsyncPipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {
  apiService = inject(ApiService);
  showSpinner = false;
  lastPage = false;

  ngOnInit(): void {
    this.loadOrdersPaged();
  }

  loadOrdersPaged() {
    this.showSpinner = true;
    from(
      this.apiService.loadPart(
        this.apiService.pagingData.offset,
        this.apiService.pagingData.limit
      )
    )
      .pipe(take(1))
      .subscribe({
        next: (result: { items: Array<Dto>; count: number }): void => {
          this.apiService.setOrderList(result.items);
          this.apiService.updatePagingData(result.items.length, result.count);
          this.showSpinner = false;
          this.lastPage =
            this.apiService.pagingData.current <
            this.apiService.pagingData.count
              ? false
              : true;
        },
        error: (e): void => {
          console.error('loading failed: ' + e);
          this.showSpinner = false;
        },
      });
  }

  nextPage(): void {
    if (this.apiService.pagingData.current < this.apiService.pagingData.count) {
      this.apiService.pagingData.offset = this.apiService.pagingData.current;
    }
    this.loadOrdersPaged();
  }
  previousPage(): void {
    if (this.apiService.pagingData.offset >= this.apiService.pagingData.limit) {
      this.apiService.pagingData.offset =
        this.apiService.pagingData.offset - this.apiService.pagingData.limit;
    }
    this.loadOrdersPaged();
  }
}
