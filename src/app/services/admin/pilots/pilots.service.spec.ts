import { TestBed, inject } from '@angular/core/testing';

import { PilotsService } from './pilots.service';

describe('PilotsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PilotsService]
    });
  });

  it('should be created', inject([PilotsService], (service: PilotsService) => {
    expect(service).toBeTruthy();
  }));
});
