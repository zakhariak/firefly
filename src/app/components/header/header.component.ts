import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: string;
  phone: string;
  message: string;

  modal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  postMessage(): void {
    console.log(this.name, this.phone, this.message);

  }

  openModal(): void {
    this.modal = true;
  }

  closeModal(): void {
    this.modal = false;
  }

}
