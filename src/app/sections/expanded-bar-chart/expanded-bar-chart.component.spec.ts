import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedBarChartComponent } from './expanded-bar-chart.component';

describe('ExpandedBarChartComponent', () => {
  let component: ExpandedBarChartComponent;
  let fixture: ComponentFixture<ExpandedBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandedBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
