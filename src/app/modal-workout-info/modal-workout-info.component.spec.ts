import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWorkoutInfoComponent } from './modal-workout-info.component';

describe('ModalWorkoutInfoComponent', () => {
  let component: ModalWorkoutInfoComponent;
  let fixture: ComponentFixture<ModalWorkoutInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWorkoutInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWorkoutInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
