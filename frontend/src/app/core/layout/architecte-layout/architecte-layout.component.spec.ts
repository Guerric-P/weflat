import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchitecteLayoutComponent } from './architecte-layout.component';

describe('PrivateLayoutComponent', () => {
  let component: ArchitecteLayoutComponent;
  let fixture: ComponentFixture<ArchitecteLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitecteLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitecteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
