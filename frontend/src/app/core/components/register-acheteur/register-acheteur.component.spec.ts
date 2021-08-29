import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterAcheteurComponent } from './register-acheteur.component';

describe('RegisterAcheteurComponent', () => {
  let component: RegisterAcheteurComponent;
  let fixture: ComponentFixture<RegisterAcheteurComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAcheteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAcheteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
