import { TestBed } from '@angular/core/testing';

import { AppRoutingLoaderService } from './app-routing-loader.service';

describe('AppRoutingLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppRoutingLoaderService = TestBed.get(AppRoutingLoaderService);
    expect(service).toBeTruthy();
  });
});
