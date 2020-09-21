import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ICategory } from '../../shared/interfaces/category.interface';
import { CategoryService } from '../../shared/services/category.service';
import { SubcategoryService } from '../../shared/services/subcategory.service';
import { ISubcategory } from '../../shared/interfaces/subcategory.interface';
import { Subcategory } from '../../shared/models/subcategory.model';

@Component({
  selector: 'app-admin-subcategory',
  templateUrl: './admin-subcategory.component.html',
  styleUrls: ['./admin-subcategory.component.scss']
})
export class AdminSubcategoryComponent implements OnInit {
  modalRef: BsModalRef;
  arrCategory: Array<ICategory> = [];
  arrSubcategory: Array<ISubcategory> = [];
  categoryName: string = 'Виберіть категорію';
  id: string = '1';
  nameEN: string;
  nameUA: string;
  category: ICategory;
  sID: string;
  editStatus: boolean = false;
  searchPlace: string;


  constructor(private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCategory();
    this.getSubcategory();
  }

  openModal(template: TemplateRef<any>, id: string) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
    this.sID = id
  }

  private getCategory(): void {
    this.categoryService.getCategory().subscribe(
      collection => {
        this.arrCategory = collection.map(category => {
          const data = category.payload.doc.data() as ICategory;
          data.id = category.payload.doc.id;
          return data
        })
      }
    )
  }


  private getSubcategory(): void {
    this.subcategoryService.getSubcategory().subscribe(
      collection => {
        this.arrSubcategory = collection.map(subcategory => {
          const data = subcategory.payload.doc.data() as ISubcategory;
          data.id = subcategory.payload.doc.id;
          return data
        })
      }
    )
  }

  addSubcategory(): void {
    if (!this.btnDis()) {
      const newSubc = new Subcategory(this.id, this.nameUA, this.nameEN, this.category as ICategory);
      if (!this.editStatus) {
        delete newSubc.id;
        this.subcategoryService.postSubcategory({ ...newSubc }).then(() => {
        })
      } else {
        newSubc.id = this.sID
        this.subcategoryService.updateSubcategory({ ...newSubc });
        this.editStatus = false;
        console.log('Subcategory edit');
      }
      this.resetForm();
    }
  }

  deleteSubcategory(): void {
    this.subcategoryService.deleteSubcategory(this.sID);
    this.modalRef.hide()
  }

  editSubcategory(subcategory: ISubcategory): void {
    this.sID = subcategory.id;
    this.nameUA = subcategory.nameUA;
    this.nameEN = subcategory.nameEN;
    this.categoryName = this.titlecaseFun(subcategory.category.nameUA);
    this.editStatus = true;
    this.setCategory();
  }


  private titlecaseFun(name: string): string {
    return name.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
  }


  btnDis(): boolean {
    if (this.nameEN && this.nameUA && this.categoryName !== 'Виберіть категорію') {
      return false
    } else {
      return true
    }
  }

  setCategory(): void {
    this.category = this.arrCategory.filter(cat => cat.nameUA === this.categoryName.toLowerCase())[0];
  }


  private resetForm(): void {
    this.nameEN = '';
    this.nameUA = '';
    this.categoryName = 'Виберіть категорію';
  }


}
