import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isLoading: boolean = false;
  constructor() {}

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  getLoading() {
    return this.isLoading;
  }
}
