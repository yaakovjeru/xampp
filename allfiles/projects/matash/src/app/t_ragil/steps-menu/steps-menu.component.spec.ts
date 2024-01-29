import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsMenuComponent } from './steps-menu.component';

describe('StepsMenuComponent', () => {
  let component: StepsMenuComponent;
  let fixture: ComponentFixture<StepsMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepsMenuComponent]
    });
    fixture = TestBed.createComponent(StepsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
