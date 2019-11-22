import { TestBed } from '@angular/core/testing';

import { ProjectsManagerService } from './projects-manager.service';

describe('ProjectsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectsManagerService = TestBed.get(ProjectsManagerService);
    expect(service).toBeTruthy();
  });
});
