import { Location } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';

import { Error404Component } from './error404.component';

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Error404Component],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
        ]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to the home page', fakeAsync(
    inject([Location], (location: Location) => {
      spyOn(component, 'onNavigate').and.callThrough();
      const compiled = fixture.debugElement.nativeElement as HTMLElement;
      compiled.querySelector('button')?.click();
      tick();
      expect(component.onNavigate).toHaveBeenCalled();
      expect(location.path()).toEqual('/home');
    })
  ));
});
