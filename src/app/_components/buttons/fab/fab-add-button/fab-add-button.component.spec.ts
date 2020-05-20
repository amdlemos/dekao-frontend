import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabAddButtonComponent } from './fab-add-button.component';

describe('FabAddButtonComponent', () => {
  let component: FabAddButtonComponent;
  let fixture: ComponentFixture<FabAddButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabAddButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
