import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { EffectsModule } from '@ngrx/effects';
import { UserListEffects } from '../../store/user-list.effects';
import { StoreModule } from '@ngrx/store';
import { userListReducer } from '../../store/user-list.reducer';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        EffectsModule.forRoot([UserListEffects]),
        StoreModule.forRoot({ users: userListReducer }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
