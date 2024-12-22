import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dto } from './dto.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly KEY = 'data';
  private orderList = new Subject<Array<Dto>>();
  public readonly orderList$ = this.orderList.asObservable();

  pagingData = {
    offset: 0,
    limit: 5,
    count: 0,
    current: 0,
  };

  public async store(data: Dto): Promise<void> {
    const currentData = await this.getItems();
    currentData.push(data);
    localStorage.setItem(this.KEY, JSON.stringify(currentData));
  }

  public async load(): Promise<Dto[]> {
    const items = await this.getItems();
    if (items.length > 10) {
      throw Error('Too many items for one request');
    }
    return items;
  }

  public async loadPart(
    offset: number,
    limit: number
  ): Promise<{ items: Dto[]; count: number }> {
    const items = await this.getItems();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // added count information for paging 
    return { items: items.slice(offset, offset + limit), count: items.length };
  }

  private async getItems(): Promise<Dto[]> {
    const serialStore = localStorage.getItem(this.KEY);
    return serialStore ? JSON.parse(serialStore) : [];
  }

  public setOrderList(list: Array<Dto>): void {
    this.orderList.next(list);
  }

  updatePagingData(loadedItems: number, count: number): void {
    this.pagingData.count = count;
    this.pagingData.current = this.pagingData.offset + loadedItems;
  }
}
