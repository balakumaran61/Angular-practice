import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianProfileComponent } from './guardian-profile.component';

describe('GuardianProfileComponent', () => {
  let component: GuardianProfileComponent;
  let fixture: ComponentFixture<GuardianProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardianProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
