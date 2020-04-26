import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuperSetComponent } from './create-super-set.component';

describe('CreateSuperSetComponent', () => {
  let component: CreateSuperSetComponent;
  let fixture: ComponentFixture<CreateSuperSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSuperSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSuperSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
