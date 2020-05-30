import { TestBed } from '@angular/core/testing';

import { GraphqlApiService } from './graphql-api.service';

describe('GraphqlApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphqlApiService = TestBed.get(GraphqlApiService);
    expect(service).toBeTruthy();
  });
});
