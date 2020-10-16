import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../shared/interfaces/category.interface';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  arrCategory: Array<ICategory> = [];

  constructor(private catservice: CategoryService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.arrCategory = [];
    this.catservice.getCategory().subscribe(collection => {
      this.arrCategory = collection.map(doc => {
        const c = doc.payload.doc.data() as ICategory;
        c.id = doc.payload.doc.id;
        return c
      })
    })
  }
}
