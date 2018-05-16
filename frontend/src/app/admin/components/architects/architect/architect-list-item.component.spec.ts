import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchitectListItemComponent } from './architect-list-item.component';

describe('ArchitectComponent', () => {
  let component: ArchitectListItemComponent;
  let fixture: ComponentFixture<ArchitectListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitectListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitectListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
