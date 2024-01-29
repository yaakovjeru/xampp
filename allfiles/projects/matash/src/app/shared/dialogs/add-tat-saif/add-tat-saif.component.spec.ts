import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTatSaifComponent } from './add-tat-saif.component';

describe('AddTatSaifComponent', () => {
  let component: AddTatSaifComponent;
  let fixture: ComponentFixture<AddTatSaifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTatSaifComponent]
    });
    fixture = TestBed.createComponent(AddTatSaifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
