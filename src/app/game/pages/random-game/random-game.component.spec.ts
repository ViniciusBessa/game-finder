import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameFiltersComponent } from '../../components/game-filters/game-filters.component';

import { RandomGameComponent } from './random-game.component';

describe('RandomGameComponent', () => {
  let component: RandomGameComponent;
  let fixture: ComponentFixture<RandomGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RandomGameComponent, GameFiltersComponent],
      imports: [HttpClientModule, SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
