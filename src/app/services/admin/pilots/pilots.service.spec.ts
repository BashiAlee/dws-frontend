import { TestBed, inject } from '@angular/core/testing';

import { PilotService } from './pilots.service';

describe('PilotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PilotService]
    });
  });

  it('should be created', inject([PilotService], (service: PilotService) => {
    expect(service).toBeTruthy();
  }));
});
