import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('service should contain first user with Bret as username', () => {
    expect(service).toBeTruthy();
    service.getUsers().subscribe((result) => {
      expect(result.find((user) => user.id === 1)?.username).toBe('Bret');
    });
  });
});
