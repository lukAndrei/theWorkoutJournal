import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignWorkoutComponent } from './design-workout.component';

describe('DesignWorkoutComponent', () => {
  let component: DesignWorkoutComponent;
  let fixture: ComponentFixture<DesignWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
