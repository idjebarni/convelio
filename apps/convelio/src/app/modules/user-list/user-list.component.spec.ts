import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserListComponent} from './user-list.component';
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./service/user.service";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [HttpClientModule, MatTableModule, MatSortModule, MatProgressSpinnerModule],
      providers: [UserService]
    }).compileComponents();
    service = TestBed.inject(UserService);
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('service should contain first user with Bret as username', () => {
    expect(service).toBeTruthy();
    service.getUsers().subscribe((result) => {
      expect(result[0].username).toBe('Bret');
    });
  });

  it('first user should be displayed correctly', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    console.log(compiled)
    /*    expect(compiled.querySelector('table-row')?.textContent).toContain(
          'Welcome convelio-app'
        );*/
  });
});
