import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRoundsModalComponent } from './set-rounds-modal.component';

describe('SetRoundsModalComponent', () => {
  let component: SetRoundsModalComponent;
  let fixture: ComponentFixture<SetRoundsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRoundsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRoundsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
