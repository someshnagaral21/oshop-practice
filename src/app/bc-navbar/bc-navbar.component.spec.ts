import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcNavbarComponent } from './bc-navbar.component';

describe('BcNavbarComponent', () => {
  let component: BcNavbarComponent;
  let fixture: ComponentFixture<BcNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
