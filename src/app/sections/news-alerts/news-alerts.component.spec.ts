import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAlertsComponent } from './news-alerts.component';

describe('NewsAlertsComponent', () => {
  let component: NewsAlertsComponent;
  let fixture: ComponentFixture<NewsAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
