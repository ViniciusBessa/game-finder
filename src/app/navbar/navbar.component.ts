import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('navContainer') navContainer!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onNavbarToggle() {
    this.navContainer.nativeElement.classList.toggle('collapsed');
  }
}
