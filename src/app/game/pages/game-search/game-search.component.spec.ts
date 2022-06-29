import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameFiltersComponent } from '../../components/game-filters/game-filters.component';

import { GameSearchComponent } from './game-search.component';

describe('GameSearchComponent', () => {
  let component: GameSearchComponent;
  let fixture: ComponentFixture<GameSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameSearchComponent, GameFiltersComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
