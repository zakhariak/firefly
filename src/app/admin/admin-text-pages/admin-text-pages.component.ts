import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-admin-text-pages',
  templateUrl: './admin-text-pages.component.html',
  styleUrls: ['./admin-text-pages.component.scss']
})
export class AdminTextPagesComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    console.log(event);
  };

  focus(event): void {
    console.log(event);
  }

  blur(event): void {
    console.log(event);
  }

}
