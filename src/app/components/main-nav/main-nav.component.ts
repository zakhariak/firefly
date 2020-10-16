import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ISubcategory } from '../../shared/interfaces/subcategory.interface';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  arrSubcategory: Array<ISubcategory> = [];
  nameCat: string = "";
  catLink: string = "";

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }


  getSubcategory(nameCategory: string, event: any): void {
    this.nameCat = nameCategory;
    this.arrSubcategory = [];
    this.firestore.collection('subcategory').ref.where('category.nameUA', '==', nameCategory.toLowerCase()).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data() as ISubcategory;
          data.id = document.id;
          this.catLink = data.category.nameEN;
          this.arrSubcategory.push({ ...data });
        })
      }
    )
    this.dropShow(event);
  }

  dropShow(event: any): void {    
    if (document.querySelector('.showDrop') && event.target.parentNode.nextSibling !== document.querySelector('.showDrop')) {
      document.querySelector('.showDrop').classList.remove('showDrop');
    }
    event.target.parentNode.nextSibling.classList.toggle('showDrop');
  }
}
