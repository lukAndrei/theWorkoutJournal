import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetNotesModalComponent } from './set-notes-modal.component';

describe('SetNotesModalComponent', () => {
  let component: SetNotesModalComponent;
  let fixture: ComponentFixture<SetNotesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetNotesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetNotesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
