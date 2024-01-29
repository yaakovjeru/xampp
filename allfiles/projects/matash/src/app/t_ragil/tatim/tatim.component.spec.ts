import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatimComponent } from './tatim.component';

describe('TatimComponent', () => {
  let component: TatimComponent;
  let fixture: ComponentFixture<TatimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TatimComponent]
    });
    fixture = TestBed.createComponent(TatimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
