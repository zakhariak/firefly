import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from '../../shared/services/product.service';
import { CategoryService } from '../../shared/services/category.service';
import { SubcategoryService } from '../../shared/services/subcategory.service';
import { TrademarkService } from '../../shared/services/trademark.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ISubcategory } from '../../shared/interfaces/subcategory.interface';
import { ICategory } from '../../shared/interfaces/category.interface';
import { ITrademarks } from '../../shared/interfaces/trademarks.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../shared/models/product.model';
import { ProdCharacter } from '../../shared/models/product-characteristics.model';
import { UploadImageService } from '../../shared/services/upload-image.service';
import { IProdCharacter } from 'src/app/shared/interfaces/product-characteristics.interface';
import { CharacteristicsService } from '../../shared/services/characteristics.service';
// import { EditorChangeContent } from 'ngx-quill';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  arrProducts: Array<IProduct> = [];
  arrCategory: Array<ICategory> = [];
  arrSubcategory: Array<ISubcategory> = [];
  arrBrands: Array<ITrademarks> = [];
  arrChar: Array<IProdCharacter> = [];
  categoryName: string = "Виберіть категорію";
  subcategoryName: string = "Виберіть категорію";
  brandName: string = "Виберіть торгову марку";

  id: string = '1';
  productCode: number = 100;
  name: string;
  category: ICategory;
  subcategory: ISubcategory;
  trademark: ITrademarks;
  image: string;
  price: number;
  discountPercent: number = 0;
  quantityInStock: number = 0;
  deliveryDays: number;
  rating: Array<number> = [];
  count: number = 1;

  pID: string;
  editStatus: boolean = false;
  searchPlace: string;
  showCharacterBlock: boolean = false;
  imagePath: string;


  charArr = [];

  constructor(private modalService: BsModalService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private trademarkService: TrademarkService,
    private firestore: AngularFirestore,
    private uploadService: UploadImageService,
    private characterService: CharacteristicsService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategory();
    this.getBrands();
    this.getCharacteristics();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl modal-dialog-centered' });
  }

  closeModal(): void {
    this.modalRef.hide();
    this.resetForm();
    this.editStatus = false;
  }

  openDeleteModal(template, prod: IProduct) {
    this.modalRef2 = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
    this.pID = prod.id;
    this.imagePath = prod.image
  }

  btnDis() {
    if (this.name && this.category && this.subcategory && this.price && this.deliveryDays && this.uploadService.getImage()) {
      return false
    } else {
      return true
    }
  }

  private resetForm(): void {
    this.name = "";
    this.arrSubcategory = [];
    this.categoryName = "Виберіть категорію";
    this.subcategoryName = "Виберіть категорію";
    this.brandName = "Виберіть торгову марку";
    this.name = "";
    this.image = "";
    this.price = null;
    this.discountPercent = null;
    this.deliveryDays = null;
    this.imagePath = "";
    this.uploadService.editImage(false);
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

  setCategory(): void {
    this.category = this.arrCategory.filter(cat => cat.nameUA.toLowerCase() === this.categoryName.toLowerCase())[0];
    this.getSubcategory();
    this.btnDis();
  }

  private getSubcategory(): void {
    this.arrSubcategory = [];
    this.firestore.collection('subcategory').ref.where('category.nameUA', '==', this.categoryName.toLowerCase()).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data() as ISubcategory;
          data.id = document.id;
          this.arrSubcategory.push({ ...data });
        })
      }
    )
  }

  setSubcategory(): void {
    this.subcategory = this.arrSubcategory.filter(scat => scat.nameUA.toLowerCase() === this.subcategoryName.toLowerCase())[0];
    this.btnDis();
  }

  private getBrands(): void {
    this.trademarkService.getTrademarks().subscribe(
      collection => {
        collection.map(brand => {
          const data = brand.payload.doc.data() as ITrademarks;
          data.id = brand.payload.doc.id;
          this.arrBrands.push({ ...data });
        })
      }
    )
  }

  setBrand(): void {
    this.trademark = this.arrBrands.filter(brand => brand.name.toLowerCase() === this.brandName.toLowerCase())[0];
    this.btnDis();
  }
  private getCharacteristics(): void {
    this.characterService.getAllCharacteristics().subscribe(collection => {
      this.arrChar = collection.map(char => {
        const data = char.payload.doc.data() as IProdCharacter;
        data.id = char.payload.doc.id;
        return data
      })
    })
  }

  private getProducts(): void {
    this.productService.getProducts().subscribe(
      collection => {
        this.arrProducts = collection.map(product => {
          const data = product.payload.doc.data() as IProduct;
          data.id = product.payload.doc.id;
          return data
        })
      }
    )
  }

  addProduct() {
    if (!this.btnDis()) {
      this.addCharacter();
      const d = new Date();
      const image = this.uploadService.getImage();
      const newP = new Product(this.id, d, this.productCode, this.name, this.subcategory, this.category, this.trademark, image, this.price, this.rating, this.deliveryDays, this.discountPercent, this.quantityInStock, this.count, this.charArr);
      if (!this.editStatus) {
        delete newP.id;
        this.productService.postProduct({ ...newP });
      } else {
        newP.id = this.pID
        this.productService.updateProduct({ ...newP });
        this.editStatus = false;
      }
      this.modalRef.hide();
      this.resetForm();
    }
  }

  deleteProduct(): void {
    this.uploadService.deleteImage(this.imagePath);
    this.productService.deleteProduct(this.pID);
    this.modalRef2.hide();
    this.imagePath = "";
  }

  editProduct(template, prod: IProduct): void {
    this.openModal(template);
    this.name = prod.name;
    this.editStatus = true;
  }


  addCharacter(): void {
    this.charArr = [];
    const sel = document.getElementById('selectsCh');
    for (let i = 0; i < sel.children.length; i++) {
      const txt = sel.children.item(i).children.item(0).textContent;
      const val = sel.children.item(i).getElementsByTagName('select').item(0).selectedOptions.item(0).value;
      const tst = {
        name: txt,
        select: val
      };
      this.charArr.push({ ...tst });
    }
  }

}
