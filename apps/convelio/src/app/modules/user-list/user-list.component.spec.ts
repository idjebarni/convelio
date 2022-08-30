import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListEffects } from './store/user-list.effects';
import { userListReducer } from './store/user-list.reducer';

import { UserService } from './service/user.service';
import { UserListComponent } from './user-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
        HttpClientModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatInputModule,
        EffectsModule.forRoot([UserListEffects]),
        StoreModule.forRoot({ users: userListReducer }),
      ],
      providers: [UserService],
    }).compileComponents();
    service = TestBed.inject(UserService);
    fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();
  });

  it('should Bret be in the table ', async () => {
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      fixture.detectChanges();

      const rows = fixture.nativeElement.querySelectorAll('tr');
      expect(rows.length).toBe(11);

      // Test Bret as first element of array
      const firstRow = rows[1];
      expect(firstRow.cells[1].innerHTML.trim()).toBe('Bret');
    });
  }, 8000);
});
