import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikerDecorationComponent } from './biker-decoration.component';

describe('BikerDecorationComponent', () => {
  let component: BikerDecorationComponent;
  let fixture: ComponentFixture<BikerDecorationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikerDecorationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikerDecorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
