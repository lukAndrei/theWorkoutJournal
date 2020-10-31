import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFlaskWorkoutsComponent } from './get-flask-workouts.component';

describe('GetFlaskWorkoutsComponent', () => {
  let component: GetFlaskWorkoutsComponent;
  let fixture: ComponentFixture<GetFlaskWorkoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFlaskWorkoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFlaskWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
