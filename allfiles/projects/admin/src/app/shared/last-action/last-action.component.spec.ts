import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastActionComponent } from './last-action.component';

describe('LastActionComponent', () => {
  let component: LastActionComponent;
  let fixture: ComponentFixture<LastActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LastActionComponent]
    });
    fixture = TestBed.createComponent(LastActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
