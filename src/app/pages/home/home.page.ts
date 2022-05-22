import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  hasFooter = true;
  hasHeader = true;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  pickupcalls(): void{
    this.router.navigate(['pickup-calls']);
  }

  add(): void{
    this.router.navigate(['pickup-call']);
  }
}
