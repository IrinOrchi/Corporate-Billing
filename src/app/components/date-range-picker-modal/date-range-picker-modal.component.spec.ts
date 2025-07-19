import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangePickerModalComponent } from './date-range-picker-modal.component';

describe('DateRangePickerModalComponent', () => {
  let component: DateRangePickerModalComponent;
  let fixture: ComponentFixture<DateRangePickerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangePickerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateRangePickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
