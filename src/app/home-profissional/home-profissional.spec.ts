import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProfissional } from './home-profissional';

describe('HomeProfissional', () => {
  let component: HomeProfissional;
  let fixture: ComponentFixture<HomeProfissional>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeProfissional],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeProfissional);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
