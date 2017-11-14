import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopperContentComponent } from './popper-content.component';

describe('PopperContentComponent', () => {
  let component: PopperContentComponent;
  let fixture: ComponentFixture<PopperContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopperContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopperContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
