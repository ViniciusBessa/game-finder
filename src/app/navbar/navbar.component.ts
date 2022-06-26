import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('navContainer') navContainer!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onNavbarToggle(): void {
    this.navContainer.nativeElement.classList.toggle('collapsed');
  }
}
