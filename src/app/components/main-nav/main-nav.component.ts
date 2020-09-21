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
  num: number = 0;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }


  getSubcategory(nameCategory: string, event: any): void {
    // console.log(event.target.parentNode.parentNode.nextSibling.style.height == "");
    if (this.num == 0) {
      event.target.parentNode.parentNode.nextSibling.classList.add('showDrop')
      this.num++
    } else {
      event.target.parentNode.parentNode.nextSibling.classList.remove('showDrop')
      this.num = 0
    }
    this.arrSubcategory = [];
    this.firestore.collection('subcategory').ref.where('category.nameUA', '==', nameCategory.toLowerCase()).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data() as ISubcategory;
          data.id = document.id;
          this.arrSubcategory.push({ ...data });
        })
      }
    )
    // if (num) {
    //   this.dropShow();
    // }
  }

  // dropShow(num: number): void {
  //   if (num !== this.num) {
  //     this.num = num;
  //     document.getElementById(`drop${num}`).style.height = '200px';
  //   } else {
  //     this.dropHide(num);
  //     this.num = 0;
  //   }
  // }

  // dropHide(num: number): void {
  //   document.getElementById(`drop${num}`).style.height = '0px';
  // }

  dropShow(): void {

  }


}
