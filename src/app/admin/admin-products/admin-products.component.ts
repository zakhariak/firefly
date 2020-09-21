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
  productCode: number = 20450;
  name: string;
  category: ICategory;
  subcategory: ISubcategory;
  trademark: ITrademarks;
  image: string;
  price: number;
  discountPercent: number = 0;
  deliveryDays: number;
  rating: Array<number> = [];

  //IProdCharacter
  // bodyMaterial: string;
  // plafondMaterial: string;
  // bodyColor: string;
  // plafondColor: string;
  // height: number;
  // allHeight: number;
  // length: number;
  // width: number;
  // diameter: number;
  // outside: number;
  // typeOfLightSource: string;
  // lampBase: string;
  // ledServiceLife: string;
  // lampCount: number;
  // lampsIncluded: string = "Лампи в комплекті...";
  // lampPower: string;
  // luminousFlux: string;
  // dimer: string = "Димер...";
  // remoteControl: string = "Пульт ДУ...";
  // degreeOfProtection: string;
  // power: string;
  // powerSupply: string;

  pID: string;
  editStatus: boolean = false;
  searchPlace: string;
  showCharacterBlock: boolean = false;
  imagePath: string;


  testArr = [];

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

  showA(name: string, event): void {
    console.log(name, event);
  }

  addSelect(): void {
    console.log('work');

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl modal-dialog-centered' });
  }

  closeModal(): void {
    this.modalRef.hide();
    this.resetForm();
  }

  openDeleteModal(template, prod: IProduct) {
    this.modalRef2 = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
    this.pID = prod.id;
    this.imagePath = prod.image
  }

  btnDis() {
    if (this.name && this.category && this.subcategory && this.trademark && this.price && this.deliveryDays && this.uploadService.getImage()) {
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

    // this.bodyMaterial = "";
    // this.plafondMaterial = "";
    // this.bodyColor = "";
    // this.plafondColor = "";
    // this.height = null;
    // this.allHeight = null;
    // this.length = null;
    // this.width = null;
    // this.diameter = null;
    // this.outside = null;
    // this.typeOfLightSource = "";
    // this.lampBase = "";
    // this.ledServiceLife = "";
    // this.lampCount = null;
    // this.lampsIncluded = "Лампи в комплекті...";
    // this.lampPower = "";
    // this.luminousFlux = "";
    // this.dimer = "Димер...";
    // this.remoteControl = "Пульт ДУ...";
    // this.degreeOfProtection = "";
    // this.power = "";
    // this.powerSupply = "";

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
    this.category = this.arrCategory.filter(cat => cat.nameUA === this.categoryName.toLowerCase())[0];
    this.getSubcategory();
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
    this.subcategory = this.arrSubcategory.filter(scat => scat.nameUA === this.subcategoryName.toLowerCase())[0];
  }

  private getBrands(): void {
    this.trademarkService.getTrademarks().subscribe(
      collection => {
        this.arrBrands = collection.map(brand => {
          const data = brand.payload.doc.data() as ITrademarks;
          data.id = brand.payload.doc.id;
          return data
        })
      }
    )
  }

  setBrand(): void {
    this.trademark = this.arrBrands.filter(brand => brand.name === this.brandName.toLowerCase())[0];
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
      const image = this.uploadService.getImage();
      // const char = new ProdCharacter(this.bodyMaterial, this.plafondMaterial, this.bodyColor, this.plafondColor, this.height, this.allHeight, this.length, this.width, this.diameter, this.outside, this.typeOfLightSource, this.lampBase, this.ledServiceLife, this.lampCount, this.lampsIncluded, this.lampPower, this.luminousFlux, this.dimer, this.remoteControl, this.degreeOfProtection, this.power, this.powerSupply);
      const newP = new Product(this.id, this.productCode, this.name, this.subcategory, this.category, this.trademark, image, this.price, this.rating, this.deliveryDays, this.discountPercent, this.testArr);
      if (!this.editStatus) {
        delete newP.id;
        console.log(newP);
        this.productService.postProduct({ ...newP }).then(() => {
          console.log('category add');
        })
      } else {
        newP.id = this.pID
        this.productService.updateProduct({ ...newP });
        this.editStatus = false;
        console.log('product edit');
      }
      this.modalRef.hide();
      this.resetForm();
    }
  }

  deleteProduct(): void {
    this.uploadService.deleteImage(this.imagePath);
    this.trademarkService.deleteTrademark(this.pID);
    this.modalRef2.hide();
    this.imagePath = "";
  }


  addCharacter(): void {
    const sel = document.getElementById('selectsCh');
    for (let i = 0; i < sel.children.length; i++) {
      const txt = sel.children.item(i).children.item(0).textContent;
      const val = sel.children.item(i).getElementsByTagName('select').item(0).selectedOptions.item(0).value;
      const tst = {
        name: txt,
        select: val
      };
      this.testArr.push({ ...tst });
    }
    console.log(this.testArr);
  }
}
