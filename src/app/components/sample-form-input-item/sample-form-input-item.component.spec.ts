import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleFormInputItemComponent } from './sample-form-input-item.component';

describe('SampleFormInputItemComponent', () => {
  let component: SampleFormInputItemComponent;
  let fixture: ComponentFixture<SampleFormInputItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleFormInputItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleFormInputItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
