import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryService } from '../../shared/services/category.service';
import { ICategory } from '../../shared/interfaces/category.interface';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  modalRef: BsModalRef;
  modalConfig: boolean;
  arrCategories: Array<ICategory> = [];
  id: string = '1';
  nameEN: string;
  nameUA: string;
  cID: string;
  editStatus: boolean = false;
  searchPlace: string;

  constructor(private categoryService: CategoryService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCategory();
  }
  openModal(template: TemplateRef<any>, boolean: boolean) {
    this.modalRef = this.modalService.show(template, boolean ? { class: 'modal modal-dialog-centered' } : { class: 'modal-sm modal-dialog-centered' });
    this.modalConfig = boolean;
  }

  openDeleteModal(template, id) {
    this.openModal(template, false);
    this.cID = id;
  }

  btnDis() {
    if (this.nameEN && this.nameUA) {
      return false
    } else {
      return true
    }
  }


  private resetForm(): void {
    this.nameEN = '';
    this.nameUA = '';
  }

  closeModal(): void {
    this.modalRef.hide();
    this.resetForm();
  }

  private getCategory(): void {
    this.categoryService.getCategory().subscribe(
      collection => {
        this.arrCategories = collection.map(category => {
          const data = category.payload.doc.data() as ICategory;
          data.id = category.payload.doc.id;
          return data
        })
      }
    )
  }

  addCategory() {
    if (!this.btnDis()) {
      const newC = new Category(this.id, this.nameUA, this.nameEN);
      if (!this.editStatus) {
        delete newC.id;
        this.categoryService.postCategory({ ...newC }).then(() => {
        })
      } else {
        newC.id = this.cID
        this.categoryService.updateCategory({ ...newC });
        this.editStatus = false;
      }
      this.modalRef.hide();
      this.resetForm();
    }
  }

  deleteCategory(): void {
    this.categoryService.deleteCategory(this.cID);
    this.modalRef.hide()
  }

  editCategory(template: TemplateRef<any>, category: ICategory): void {
    this.openModal(template, true);
    this.cID = category.id;
    this.nameUA = category.nameUA;
    this.nameEN = category.nameEN;
    this.editStatus = true;
  }
}
