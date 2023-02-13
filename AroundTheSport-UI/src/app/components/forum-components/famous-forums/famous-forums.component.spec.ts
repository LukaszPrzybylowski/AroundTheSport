import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamousForumsComponent } from './famous-forums.component';

describe('FamousForumsComponent', () => {
  let component: FamousForumsComponent;
  let fixture: ComponentFixture<FamousForumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamousForumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamousForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
