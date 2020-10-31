import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupersetNotesComponent } from './superset-notes.component';

describe('SupersetNotesComponent', () => {
  let component: SupersetNotesComponent;
  let fixture: ComponentFixture<SupersetNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupersetNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupersetNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
