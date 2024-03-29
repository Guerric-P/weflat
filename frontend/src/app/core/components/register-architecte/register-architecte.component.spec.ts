import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterArchitecteComponent } from './register-architecte.component';

describe('RegisterArchitecteComponent', () => {
  let component: RegisterArchitecteComponent;
  let fixture: ComponentFixture<RegisterArchitecteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterArchitecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterArchitecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
