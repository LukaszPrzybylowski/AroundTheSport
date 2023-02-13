import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamousArticlesComponent } from './famous-articles.component';

describe('FamousArticlesComponent', () => {
  let component: FamousArticlesComponent;
  let fixture: ComponentFixture<FamousArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamousArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamousArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
