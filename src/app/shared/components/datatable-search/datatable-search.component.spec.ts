import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableSearchComponent } from './datatable-search.component';

describe('DatatableSearchComponent', () => {
  let component: DatatableSearchComponent;
  let fixture: ComponentFixture<DatatableSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
